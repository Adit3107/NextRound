from flask import Flask,request,jsonify,make_response
from flask_mongoengine import MongoEngine
from flask_restful import Resource,Api
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime,timedelta
from .src.genai import get_pdf_text,get_qna
from .src.eval import evaluate_answer
from .src.test import transcribe_audio
from functools import wraps
import json
import uuid

app = Flask(__name__)
app.config['SECRET_KEY'] = '7a4d9d14b55646dfa0f1de72a5f86523'
app.config['REFRESH_SECRET_KEY'] = '60713b86-c25f-4e0e-9d47-beac38b516d5'
app.config["MONGO_URI"] = "mongodb://localhost:27017/mock_interviewer_db"
db = MongoEngine(app)
bcrypt = Bcrypt(app)

class User(db.Document):
    name = db.StringField(required=True)
    email = db.EmailField(required=True,unique=True)
    password_hash = db.StringField(max_length=255)
    auth_type = db.StringField(choices = ["traditional","oauth"],required=True)
    resume_file =db.FileField()
    resume_data = db.StringField()
    created_at = db.DateTimeField(default=datetime.now())

    def check_password(self,passwrd):
        return bcrypt.check_password_hash(self.password_hash,passwrd)

class InterviewQuestion(db.EmbeddedDocument):
    question_id = db.StringField(required=True)
    category = db.StringField(required=True)
    question_body = db.StringField(required=True)
    correct_answer_body = db.StringField(required=True)
    user_answer_body = db.StringField()
    score = db.FloatField()
    feedback = db.StringField()

class Interview(db.Document):
    user = db.ReferenceField(User,required=True)
    job_type = db.StringField(required=True)
    exp_yrs = db.DecimalField(required=True)
    overall_score = db.FloatField()
    qna = db.EmbeddedDocumentListField(InterviewQuestion)
    created_at = db.DateTimeField(default=datetime.now())

class BlackListedTokens(db.Document):
    token = db.StringField(required=True)
    created_at = db.DateTimeField(default=datetime.now())

def token_required(func):
    @wraps(func)
    def decorated(*args,**kwargs):
        token = None
        if "Authorization" in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith("Bearer "):
                parts = auth_header.split(" ")

            if len(parts) == 2 and parts[0] == "Bearer":
                token = parts[1]
        if not token:
            return jsonify({"error": "token not found"}), 400
        try:
            payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid Token"}), 401
        
        return func(payload,*args,**kwargs)
    return decorated


@app.route('/api/register',methods=['POST'])
def register():
    if request.method=='POST':
        name = request.form.get("name")
        email = request.form.get("email")
        password = request.form.get("password")
        auth_type = "traditional"
        resume_file = request.files.get("resume")

        if not name or not email or not password:
            return jsonify({"error":"All fields are required to be filled"}),400

        if  User.objects(email=email).first():
            return jsonify({"error":"email entered is already in use"}),400

        hashed_password = bcrypt.generate_password_hash(password=password).decode("utf-8")

        user = User(
            name=name,
            email=email,
            password_hash = hashed_password,
            auth_type = auth_type,
            created_at = datetime.utcnow()
        )

        if resume_file:
            user.resume_file.put(resume_file,content_type=resume_file.content_type)
            user.resume_data = get_pdf_text(resume_file)

        user.save()
        return jsonify({"messg":"user registered successfully"}),200
    else:
        return jsonify({'err':'invalid request method'}),400

@app.route('/api/refresh',methods=['POST'])
def refresh_token():
    if request.method=='POST':
        ref_token = request.cookies.get('refresh_token')
        if not ref_token:
            return jsonify({'err':"refresh token missing"}),401
        if BlackListedTokens.objects(token=ref_token).first():
            return jsonify({'err':"Invalid token, login again"}),401
        try:
            decoded_ref = jwt.decode(ref_token,app.config['REFRESH_SECRET_KEY'],algorithms=["HS256"])
            token = jwt.encode({
            'name' : decoded_ref['name'],
            'email' : decoded_ref['name'],
            'resume_data' : decoded_ref['resume_data'],   
            'exp': datetime.now() + timedelta(days=1),
            'iat': datetime.now()
        },app.config['SECRET_KEY'],algorithm="HS256")
            return jsonify({'mssg':token}),200
        except jwt.ExpiredSignatureError:
            return jsonify({'err':"refresh token expired"}),400
        except jwt.InvalidTokenError:
            return jsonify({'err':"invalid refresh token"}),401

    else:
        return jsonify({'err':"invalid request method"}),400

@app.route('/api/login',methods=['POST'])
def login():
    if request.method=='POST':

        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split('')[1]
            try:
                jwt.decode(token,app.config['SECRET_KEY'],algorithms='HS256')
                return jsonify({'err':'user already logged in'}),400
            except jwt.ExpiredSignatureError:
                pass
            except jwt.InvalidTokenError:
                pass

        email = request.form.get('email')
        password = request.form.get('password')
        user = User.objects(email=email).first()
        if not user:
            return jsonify({'err':"user not found "}),400
        if not user.check_password(password):
            return jsonify({'err':"invalid password"}),400
        
        token = jwt.encode({
            'name' : user.name,
            'email' : user.email,
            'resume_data' : user.resume_data,   
            'exp': datetime.now() + timedelta(days=1),
            'iat': datetime.now()
        },app.config['SECRET_KEY'],algorithm="HS256")

        ref_token = jwt.encode({
            'name' : user.name,
            'email' : user.email,
            'resume_data' : user.resume_data,   
            'exp': datetime.now() + timedelta(days=7),
            'iat': datetime.now()
        },app.config['REFRESH_SECRET_KEY'],algorithm="HS256")

        response = make_response(jsonify({'access_token':token}),200)
        response.set_cookie(
            key='refresh_token',
            value=ref_token,
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=7*24*60*60
        )

    else:
        return jsonify({'err':"invalid request method"}),400

@app.route('/api/logout',methods=['POST'])
@token_required
def logout(payload):
    try:
        ref_token = request.cookies.get('refresh_token')
        if not ref_token:
            return jsonify({'err':"no refresh token found"}),401
        blacklisted_token = BlackListedTokens(token=ref_token)
        blacklisted_token.save()

        response = make_response(jsonify({'messg':'logged out successfully'}),200)
        response.set_cookie('refresh_token','',expires=0,httponly=True,samesite='Lax')
        return response
        
    except Exception as e:
        return jsonify({'err':"invalid request method"}),500


@app.route('/api/generate_interview',methods=['POST'])
@token_required
def generate_interview(payload):
    if request.method=='POST':
        try:
            user_email = payload.get('email')
            user = User.objects(email=user_email).first()
            if not user:
                return jsonify({'err':'user not found during interview generation'}),404 

            resume_data = user.resume_data
            if not resume_data:
                return jsonify({'err':'could not fetch resume text of user'}),404 

            job_des = request.form.get('job')
            exp = request.form.get('experience')
            if not job_des or not exp:
                return jsonify({'err':'job_des and exp fields are required'}),404

            print("Fetching QnA from get_qna()...")
            qna_string = get_qna(resume_data, job_des, exp)
            print("QnA String Received:", repr(qna_string))

            if not qna_string:
                return jsonify({'err':'user not found during interview generation'}),404  
            try:
                qna_json = json.loads(qna_string)
            except json.JSONDecodeError:
                return jsonify({'err':'could not decode qna string to valid Json'}),400

            qna_list = []
            for category,Question in qna_json.items():
                for q in Question:
                    qna_list.append(
                        InterviewQuestion(
                            question_id = str(uuid.uuid4()),
                            category= category,
                            question_body = q['Question'] ,
                            correct_answer_body = q['Answer'],
                            user_answer_body = None,
                            feedback = None
                    )
                )
            interview = Interview(
                user = user,
                job_type = job_des,
                exp_yrs = exp,
                overall_score = None,
                qna = qna_list
            )
            interview.save()
            response_body = {
                    "interview_id" : str(interview.id),
                    "questions_ans" : [
                        {"id":q.question_id,"category":q.category,"question":q.question_body,"answer":q.correct_answer_body}
                        for q in qna_list
                    ]
            }
            return jsonify({'messg':response_body}),200
        except Exception as e:
            return jsonify({'err':str(e)}),400
    else:
        return jsonify({'err':'invalid request method'}),400

@app.route('/api/submit',methods=['PATCH'])
@token_required
def submit_answer(payload):
    if request.method=='PATCH':
        try:
            user_email = payload.get('email')
            if not user_email:
                return jsonify({'err':'user email not found from payload'}),404
            user = User.objects(email=user_email).first()
            if not user:
                return jsonify({'err':'user not found'}),404
            data = request.get_json()
            user_answer = data.get('user_answer')
            interview_id = data.get('interview_id')
            question_id = data.get('question_id')
            interview = Interview.objects(id=interview_id).first()
            if not interview:
                return jsonify({'err':'interview not found'}),404
            creator_id = interview.user.id
            print("Logged-in user ID:", user.id)
            print("Interview creator ID:", creator_id)
            print("Interview creator type:", type(creator_id))
            print("Logged-in user type:", type(user.id))
            if user.id != creator_id:
                return jsonify({'err':'user and interview creators dont match'}),400
            
            for q in interview.qna:
                if q.question_id == question_id:
                    q.user_answer_body = user_answer
                    evaluation_str = evaluate_answer(ques=q.question_body,ideal_ans=q.correct_answer_body,user_ans=q.user_answer_body)
                    print("eval_str recieved",evaluation_str)
                    try:
                        eval_json = json.loads(evaluation_str)
                    except json.JSONDecodeError:
                        return jsonify({'err':'Invalid json string recieved during answer evaluation'}),400
                    
                    score = float(eval_json['Score'])
                    feedback = eval_json['Feedback']
                    if score is None or feedback is None:
                        return jsonify({'err':'Score or feedback not found'}),404
                    q.score = score
                    q.feedback = feedback
                    interview.save()
                    return jsonify({"score":str(score),"feedback":feedback}),200
                    
            else:
                return jsonify({'err':'interview question for which answer is to be submitted not found'}),400
            
        except Exception as e:
            return jsonify({'err':str(e)}),400
        pass
    else:
        return jsonify({'err':'invalid request method'}),400

@app.route('/api/stop_recording',methods=['POST'])
@token_required
def transcribe(payload):
    if request.method=='POST':
        try:
            audio_file = request.files['audio']
            if not audio_file:
                return jsonify({'err':'audio file not found'}),404
            audio_text = transcribe_audio(audio_file)
            if not audio_text:
                return jsonify({'err':'some error during transcription'}),400
            return jsonify({'messg':audio_text}),200
        except Exception as e:
            return jsonify({'err':str(e)}),400
        pass
    else:   
        return jsonify({'err':'invalid request method'}),400


@app.route('api/users/<string:user_name>',methods=['GET'])
def display_profile(user_name):
    user = User.objects(username=user_name).first()
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404

@app.route('/api/edit_profile',methods=['PATCH'])
@token_required
def edit_profile(payload):
    if request.method=='PATCH':
        try:
            user_email = payload.get('email')
            user = User.objects(email=user_email).first()
            if not user:
                return jsonify({'err':'User not found'}),400
            email = request.form.get('email')
            name = request.form.get('name')
            resume_file = request.files.get('resume')
            if resume_file:
                resume_data = get_pdf_text(resume_file)
                user.resume_file.put(resume_file,content_type=resume_file.content_type)
                user.resume_data = resume_data
            if email:
                user.email = email
            if name:
                user.name = name
            
            user.save()
            return jsonify({'mssg':'User data updated'}),200    
            pass
        except Exception as e:
            return jsonify({'err':str(e)}),500
        pass
    else:
        return jsonify({'err':'invalid request method'}),400


if __name__ == "__main__":
    app.run(debug=True)


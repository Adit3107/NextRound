from flask import Blueprint,request,jsonify,make_response
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime,timedelta
from backend.src.genai import get_pdf_text,get_qna
from backend.src.eval import evaluate_answer
from backend.src.test import transcribe_audio
from backend.models.models import User,Interview,InterviewQuestion,BlackListedTokens
from backend.config import Config
from backend.utils import token_required

app_bp = Blueprint('auth',__name__)
bcrypt = Bcrypt()

@app_bp.route('/api/register',methods=['POST'])
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

@app_bp.route('/api/refresh',methods=['POST'])
def refresh_token():
    if request.method=='POST':
        ref_token = request.cookies.get('refresh_token')
        if not ref_token:
            return jsonify({'err':"refresh token missing"}),401
        if BlackListedTokens.objects(token=ref_token).first():
            return jsonify({'err':"Invalid token, login again"}),401
        try:
            decoded_ref = jwt.decode(ref_token,Config.SECRET_REFRESH_KEY,algorithms=["HS256"])
            token = jwt.encode({
            'name' : decoded_ref['name'],
            'email' : decoded_ref['name'],
            'resume_data' : decoded_ref['resume_data'],   
            'exp': datetime.now() + timedelta(days=1),
            'iat': datetime.now()
        },app_bp.config['SECRET_KEY'],algorithm="HS256")
            return jsonify({'mssg':token}),200
        except jwt.ExpiredSignatureError:
            return jsonify({'err':"refresh token expired"}),400
        except jwt.InvalidTokenError:
            return jsonify({'err':"invalid refresh token"}),401

    else:
        return jsonify({'err':"invalid request method"}),400

@app_bp.route('/api/login',methods=['POST'])
def login():
    if request.method=='POST':

        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split('')[1]
            try:
                jwt.decode(token,Config.SECRET_KEY,algorithms=['HS256'])
                return jsonify({'err':'user already logged in'}),400
            except jwt.ExpiredSignatureError:
                pass
            except jwt.InvalidTokenError:
                pass

        email = request.form.get('email')
        password = request.form.get('password')
        user = User.objects(email=email).first()
        if not user:
            return jsonify({'err':"user not found "}),404
        if not user.check_password(password):
            return jsonify({'err':"invalid password"}),400
        
        token = jwt.encode({
            'name' : user.name,
            'email' : user.email,
            'resume_data' : user.resume_data,   
            'exp': datetime.now() + timedelta(days=1),
            'iat': datetime.now()
        },Config.SECRET_KEY,algorithm="HS256")

        ref_token = jwt.encode({
            'name' : user.name,
            'email' : user.email,
            'resume_data' : user.resume_data,   
            'exp': datetime.now() + timedelta(days=7),
            'iat': datetime.now()
        },Config.SECRET_REFRESH_KEY,algorithm="HS256")

        response = make_response(jsonify({'access_token':token}),200)
        response.set_cookie(
            key='refresh_token',
            value=ref_token,
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=7*24*60*60
        )
        return response

    else:
        return jsonify({'err':"invalid request method"}),400

@app_bp.route('/api/logout',methods=['POST'])
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


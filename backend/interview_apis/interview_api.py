from flask import Blueprint,request,jsonify,make_response
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime,timedelta
from backend.src.genai import get_pdf_text,get_qna
from backend.src.eval import evaluate_answer
from backend.src.test import transcribe_audio
from functools import wraps
import json
import uuid
from backend.models.models import User,Interview,InterviewQuestion,BlackListedTokens
from backend.utils import token_required

app_bp = Blueprint('interview_api',__name__)
bcrypt = Bcrypt()

@app_bp.route('/api/generate_interview',methods=['POST'])
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

@app_bp.route('/api/submit',methods=['PATCH'])
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
                return jsonify({'err':'user and interview creators dont match'}),403
            
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

@app_bp.route('/api/stop_recording',methods=['POST'])
@token_required
def transcribe(payload):
    if request.method=='POST':
        try:
            audio_file = request.files.get('audio')
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



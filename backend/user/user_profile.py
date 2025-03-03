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
from backend.config import Config

app_bp = Blueprint('user_profile',__name__)

@app_bp.route('/api/users/<string:user_name>',methods=['GET'])
def display_profile(user_name):
    user = User.objects(name=user_name).first()
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404

@app_bp.route('/api/edit_profile',methods=['PATCH'])
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



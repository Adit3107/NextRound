from flask import Flask,request,jsonify,make_response
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
from backend.config import Config


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
            payload = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid Token"}), 401
        
        return func(payload,*args,**kwargs)
    return decorated

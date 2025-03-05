from flask import Flask,request,jsonify,make_response
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime,timedelta
from .src.genai import get_pdf_text,get_qna
from .src.eval import evaluate_answer
from .src.test import transcribe_audio
from functools import wraps
import json
import uuid
from backend.models.models import User,Interview,InterviewQuestion,BlackListedTokens
from backend.utils import token_required
from backend.interview_apis import interview_api
from backend.auth import auth
from backend.user import user_profile
from backend.config import Config


app = Flask(__name__)

app.config.from_object(Config)

db = MongoEngine()
db.init_app(app)
bcrypt = Bcrypt(app)

app.register_blueprint(interview_api.app_bp)
app.register_blueprint(auth.app_bp)
app.register_blueprint(user_profile.app_bp)

if __name__ == "__main__":
    app.run(debug=True)


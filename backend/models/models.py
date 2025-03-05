from flask import Flask,request,jsonify,make_response
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt
from datetime import datetime

db = MongoEngine()
bcrypt = Bcrypt()



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
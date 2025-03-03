import streamlit as st
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain_community.vectorstores import FAISS
# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain.chains.question_answering import load_qa_chain
# from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import json
import re

load_dotenv()
genai.configure(api_key=os.getenv("API_KEY"))

def get_pdf_text(pdf_doc):
    text = ""
    pdf_reader = PdfReader(pdf_doc)
    for page in pdf_reader.pages:
        text+= page.extract_text()
    return text

def get_chunks(pdf_text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=100)
    chunks = text_splitter.split_text(pdf_text)
    return chunks

def get_qna(text,job,exp):
    
    prompt_template ="""Based on the Resume and the given below contexts of Job Description and Experience,
generate exactly 10 interview questions: 5 Technical and 5 HR. Provide the ideal answers as well.
Ensure answers are professional and concise. **Do not include extra text, disclaimers, explanations, or greetings.**
Strictly return **only valid JSON output** with the exact format:

```json
{{
    "Technical Questions": [
        {{"Question": "What is Python?", "Answer": "Python is a programming language."}},
        {{"Question": "Explain OOP principles.", "Answer": "Encapsulation, inheritance, polymorphism, and abstraction."}}
    ],
    "HR Questions": [
        {{"Question": "Tell me about yourself.", "Answer": "I am a software engineer with 5 years of experience."}},
        {{"Question": "Describe a challenge you faced.", "Answer": "Handled a major deadline issue by optimizing processes."}}
    ]
}}
      Atleast three questions must be directly related to the resume.
      Resume : \n{text}\n
      Job Description : \n {job_des}\n
      Experience: \n {exp}\n
"""
    model = genai.GenerativeModel("gemini-1.5-pro")
    prompt = prompt_template.format(text=text, job_des=job, exp=exp)
    
    try:
        print("Calling Gemini API...")  
        response = model.generate_content(prompt)
        
        if not response or not response._result.candidates:
            print("Error: Gemini API returned an empty response")
            return None
        
        content = response._result.candidates[0].content.parts[0].text.strip()
        print("Raw QnA Response:", repr(content))  #

        cleaned = re.sub(r'```json|```', "", content).strip()

        try:
            qna_json = json.loads(cleaned)
            print("Valid JSON Parsed Successfully!")  
            return cleaned  
        except json.JSONDecodeError:
            print("Error: Invalid JSON received from Gemini API")
            return None

    except Exception as e:
        print("Error in get_qna():", str(e))
        return None


# def generate_questions():
#     res = get_qna()
#     content = res._result.candidates[0].content.parts[0].text
#     cleaned = re.sub(r'[\x00-\x1F\x7F]',"",content)
#     return cleaned

# if __name__ == "__main__":
#     pdf_path = r'D:\coding\whisper\Shashwat_Awate_C2K231269_Resume.pdf'
#     with open(pdf_path,'rb') as file:
#         text = get_pdf_text(file)
#         chunky = get_chunks(text)
#         response = get_qna(text)
#         content =response._result.candidates[0].content.parts[0].text 
#         cleaned = re.sub(r'[\x00-\x1F\x7F]',"",content)
#         # print("cleaned: ",cleaned)
#         if cleaned:
#             try:
#                 data = json.loads(cleaned)
#                 print('data loaded')
#                 with open('qna.json' ,'w')as json_file:
#                     json.dump(data,json_file,indent=4)
#             except Exception as e:
#                 print("err",e)
            
        # print(content)

# text = '''Shashwat Awate
# ♂¶ap-¶arker-altPune /envel⌢peshashwat.awate@gmail.com ♂phone-alt91 9371004230
# /linkedin-inhttps://tinyurl.com/Shashwat-Awate-LinkedIn /githubhttps://github.com/ShashwatAwate
# Education
# Podar International School
# Central Board of Secondary Education(CBSE)
# ◦Percentage: 94.0
# Namo Rims Junior College
# Higher Secondary Certificate(HSC)
# ◦Percentage: 76.83
# ◦MHT-CET: 99.4
# Pune Institute of Computer Technology
# BE in Computer Engineering
# ◦Current GPA: 9.67/10.0
# Projects
# Deepfake Detection Model
# ◦Designed and implemented a neural network to identify deepfake videos with high accuracy.
# ◦Developed as part of the Smart India Hackathon, where the project was shortlisted among 200+ competing
# teams in the internal college rounds.
# ◦Leveraged ResNet Convolutional Neural Networks.
# ◦Tools Used: Python, Tensorflow, Keras, Convolutional Neural Networks
# Image Upscaling CNN
# ◦Currently developing a CNN based image upscaling model that upscales now resolution images to high
# resolution images.
# ◦Inspired by advanced upscaling techniques used in modern games.
# ◦Focused on training and optimizing model for high performance image reconstruction.
# ◦Tools Used: Tensorflow,OpenCV,Numpy.
# Virtual Rehabilitation Assistant
# ◦Developed exercise evaluation algorithm using Mediapipe JS for correctly evalutaing different exercises.
# ◦Developed as a part of TechFiesta Hackathon
# ◦Used Mediapipe for JavaScript to enable client side rendering for accurate exercise validation and latency
# reduction .
# ◦Tools Used: HTML,React JS,Mediapipe(JS),Tailwind,Express,MongoDB
# ◦Currently focusing on developing exercise validation algorithms.
# Experience
# Face Recognition Based Attendance System
# ◦Contributed to the development of a facial recognition-based attendance
# system as part of a research project under a college professor.
# ◦Managed the data gathering process, ensuring high-quality datasets for
# training the facial recognition model.
# Shashwat Awate - Page 1 of 2Last updated in February 2025Technologies
# Languages: C++ , Python , JavaScript
# Technologies: Numpy, Pandas, Scikit-learn, Tensorflow, Keras, Mediapipe.
# Extra Curricular
# PASC Pulzion 2024
# ◦Successfully onboarded a Judge for the event.
# ◦Worked for the marketing team for the event along with a team of 50+
# people to onboard sponsors for the event.
# ◦Worked with publicity team 100+ members to promote the event across
# campus.
# Shashwat Awate - Page 2 of 2'''
# job = 'data scientist'
# exp = 0
# ans = get_qna(text,job,exp)
# print (ans)
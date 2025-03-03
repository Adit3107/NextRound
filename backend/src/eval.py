
import os
import google.generativeai as genai
from dotenv import load_dotenv
import json
import re

load_dotenv()
genai.configure(api_key=os.getenv("API_KEY"))

# def evaluate_answer():
    
#     with open('qna.json','r') as json_file:
#         recorded_ans = ""
#         data = json.load(json_file)

#         category = 'HR Questions'
#         ques = data[category][0]["Question"]
#         ans = data[category][0]["Answer"]

#         print("Question: ",ques)
#         char = ''
#         print('ready to answer? (press y if yes)')
#         while(char!='y'):
#             char = input()
#         if(char=='y'):
#             recorded_ans += record_and_transcribe()
#         else:
#             print("Audio Not recorded!")
#         if recorded_ans:
#             prompt_template = """You are given two strings, one is Ideal Answer and the other is the answer given by the user, 
#                                 based on the ideal answer, judge the correctness of the user's answer. Also judge based on confidence and english used.
#                                 Based on all these factors, judge the answer on a scale of 10, also give pointwise reasons for the score.
#                                 Ideal_Answer: {ideal_ans},
#                                 User_Answer: {user_ans}
#                                 """
#             model = genai.GenerativeModel("gemini-pro")
#             prompt = prompt_template.format(ideal_ans=ans,user_ans=recorded_ans)
#             response = model.generate_content(prompt)
#             return response

# res = evaluate_answer()
# content = res._result.candidates[0].content.parts[0].text
# print(content)

def evaluate_answer(ques,ideal_ans,user_ans):
    prompt_template ="""You are given two strings, one is Ideal Answer and the other is the answer given by the user, 
                                based on the ideal answer, judge the correctness of the user's answer. Also judge based on confidence and english used.
                                Based on all these factors, judge the answer on a scale of 10, also give reasons for the score in the feedback.
                                Question: {question},
                                Ideal_Answer: {ideal_ans},
                                User_Answer: {user_ans},
                                **Do not include extra text, disclaimers, explanations, or greetings.**
                                Strictly return **only valid JSON output** with the exact format:
                                ```json
                                {{
                                    "Score": "2",
                                    "Feedback":"lacks confidance"
                                }}
                                """
    model = genai.GenerativeModel("gemini-1.5-pro")
    prompt = prompt_template.format(question=ques,ideal_ans=ideal_ans,user_ans=user_ans)
    try:
        print("Calling Gemini API...")  
        response = model.generate_content(prompt)
        
        if not response or not response._result.candidates:
            print("Error: Gemini API returned an empty response")
            return None
        
        content = response._result.candidates[0].content.parts[0].text.strip()
        print("Raw Feedback Response:", repr(content))  

        cleaned = re.sub(r'```json|```', "", content).strip()

        try:
            feedback_json = json.loads(cleaned)
            print("Valid JSON Parsed Successfully!")  
            return cleaned  
        except json.JSONDecodeError:
            print("Error: Invalid JSON received from Gemini API")
            return None

        pass
    except Exception as e:
        return str(e)



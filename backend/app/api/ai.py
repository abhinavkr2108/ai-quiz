import dotenv

dotenv.load_dotenv()

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests

router = APIRouter()

class QuestionData(BaseModel):
    topic: str
    number_of_questions: int
    difficulty: str


# 

# API endpoint - POST /ai
@router.post("/create-question")
async def ask_ai(data: QuestionData):
    topic = data.topic
    number_of_questions = data.number_of_questions
    difficulty = data.difficulty

    if not topic or not number_of_questions or not difficulty:
        raise HTTPException(status_code=400, detail="Please fill all the fields")
    
    if number_of_questions <= 0:
        raise HTTPException(status_code=400, detail="Please enter a number greater than 0")
    
    headers = {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
    }
    
    # Example payload for OpenAI API. Adjust according to the API's requirements.
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": f"You are a helpful assistant that generates {difficulty} questions on {topic}."},
            {"role": "user", "content": f"Generate {number_of_questions} questions."}
        ]
    }

    try:
        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
        response.raise_for_status()
        questions = response.json()
        return questions
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@router.get("/test")
async def test_route():
    return {"message": "This is a test route"}

@router.get("/")
async def test_route():
    return {"message": "Hello World"}


import dotenv

dotenv.load_dotenv()

from fastapi import APIRouter

router = APIRouter()

# API endpoint - POST /ai
@router.post("")
async def ask_ai(request_body: dict):

    # an example of a query for a POST 
    query = request_body.get("query")

    # write code here to stream from OpenAI ... 

    return



from fastapi import APIRouter, HTTPException
import requests
import os

PRO_PUBLICA_API_KEY = os.getenv('PRO_PUBLICA_API_KEY')

router = APIRouter()

@router.get('/api/pro_publica/statements/{id}')
async def get_news(id: str):

    params = {
        'congress': 118,
        'memberId': id,
    }

    api_url = f'https://api.propublica.org/congress/v1/members/{params["memberId"]}/statements/{params["congress"]}.json'

    headers = {
        'X-API-Key': PRO_PUBLICA_API_KEY,
    }

    try:
        response = requests.get(api_url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))

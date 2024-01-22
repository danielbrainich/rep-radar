from fastapi import APIRouter, HTTPException
import requests
import os

PRO_PUBLICA_API_KEY = os.getenv('PRO_PUBLICA_API_KEY')

router = APIRouter()

@router.get('/api/pro_publica/ids')
async def get_news():

    params = {
        'congress': 118,
        'chamber': 'house',
    }

    api_url = f'https://api.propublica.org/congress/v1/{params["congress"]}/{params["chamber"]}/members.json'

    headers = {
        'X-API-Key': PRO_PUBLICA_API_KEY,
    }

    try:
        response = requests.get(api_url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))

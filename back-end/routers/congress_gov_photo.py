from fastapi import APIRouter, HTTPException
import requests
import os

CONGRESS_GOV_API_KEY = os.getenv('CONGRESS_GOV_API_KEY')

congress_gov_photo = APIRouter()

@congress_gov_photo.get('/api/congress_gov/photo/{bioId}')
async def get_representative(bioId: str):
    params = {
        'bioId': bioId,
        'key': CONGRESS_GOV_API_KEY,
    }
    api_url = f'https://api.congress.gov/v3/member/{params["bioId"]}?api_key={params["key"]}'

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))

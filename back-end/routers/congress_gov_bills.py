from fastapi import APIRouter, HTTPException
import requests
import os

CONGRESS_GOV_API_KEY = os.getenv("CONGRESS_GOV_API_KEY")

router = APIRouter()


@router.get("/api/congress_gov/bills/{bioId}")
async def get_representative(bioId: str):
    params = {
        "bioId": bioId,
        "key": CONGRESS_GOV_API_KEY,
    }
    api_url = f'https://api.congress.gov/v3/member/{params["bioId"]}/sponsored-legislation?api_key={params["key"]}'

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))

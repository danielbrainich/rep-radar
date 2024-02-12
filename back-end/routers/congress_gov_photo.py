from fastapi import APIRouter, HTTPException
from redis import Redis
import requests
import os
import json

CONGRESS_GOV_API_KEY = os.getenv("CONGRESS_GOV_API_KEY")
router = APIRouter()
redis = Redis(host="localhost", port=6379, db=0, decode_responses=True)


@router.get("/api/congress_gov/photo/{bioId}")
async def get_representative(bioId: str):
    cache_key = f"congress_gov_photo_{bioId}"

    cached_data = redis.get(cache_key)
    if cached_data:
        return json.loads(cached_data)

    api_url = (
        f"https://api.congress.gov/v3/member/{bioId}?api_key={CONGRESS_GOV_API_KEY}"
    )

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()

        redis.set(cache_key, json.dumps(data), ex=86400)
        return data

    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))

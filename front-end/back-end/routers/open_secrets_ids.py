from fastapi import APIRouter, HTTPException
from redis import Redis
import requests
import os
import json

OPEN_SECRETS_API_KEY = os.getenv("OPEN_SECRETS_API_KEY")
router = APIRouter()
redis = Redis(host="localhost", port=6379, db=0, decode_responses=True)


@router.get("/api/open_secrets/ids/{state}")
async def get_rep(state: str):
    cache_key = f"open_secrets_ids_{state}"

    cached_data = redis.get(cache_key)
    if cached_data:
        return json.loads(cached_data)

    api_url = "http://www.opensecrets.org/api/"
    params = {
        "method": "getLegislators",
        "id": state,
        "apikey": OPEN_SECRETS_API_KEY,
        "output": "json",
    }
    headers = {
        "Content-Type": "application/json",
        "User-Agent": "MyApp/1.0",
    }

    try:
        response = requests.get(api_url, params=params, headers=headers)
        response.raise_for_status()
        data = response.json()
        redis.set(cache_key, json.dumps(data), ex=86400)
        return data
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))

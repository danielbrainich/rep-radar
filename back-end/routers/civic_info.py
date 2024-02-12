from fastapi import APIRouter, HTTPException
from redis import Redis
import requests
import os
import json

CIVIC_INFO_API_KEY = os.getenv("CIVIC_INFO_API_KEY")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

router = APIRouter()
redis = Redis.from_url(REDIS_URL, decode_responses=True)


@router.get("/api/civic_info/{address}")
async def get_representative(address: str):
    cache_key = f"civic_info_{address}"

    cached_data = redis.get(cache_key)
    if cached_data:
        return json.loads(cached_data)

    api_url = "https://www.googleapis.com/civicinfo/v2/representatives"
    params = {
        "address": address,
        "includeOffices": "true",
        "levels": "country",
        "roles": "legislatorLowerBody",
        "key": CIVIC_INFO_API_KEY,
    }

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        data = response.json()

        redis.set(cache_key, json.dumps(data), ex=86400)

        return data
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))

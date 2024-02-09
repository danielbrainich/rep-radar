from fastapi import APIRouter, HTTPException
from redis import Redis
import requests
import os
import json

PRO_PUBLICA_API_KEY = os.getenv("PRO_PUBLICA_API_KEY")
router = APIRouter()
redis = Redis(host='localhost', port=6379, db=0, decode_responses=True)


@router.get("/api/pro_publica/statements/{id}")
async def get_statements(id: str):
    congress = 118
    cache_key = f"pro_publica_statements_{id}_{congress}"

    cached_data = redis.get(cache_key)
    if cached_data:
        return json.loads(cached_data)

    api_url = f'https://api.propublica.org/congress/v1/members/{id}/statements/{congress}.json'

    headers = {
        "X-API-Key": PRO_PUBLICA_API_KEY,
    }

    try:
        response = requests.get(api_url, headers=headers)
        response.raise_for_status()
        data = response.json()
        redis.set(cache_key, json.dumps(data), ex=86400)
        return data
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))

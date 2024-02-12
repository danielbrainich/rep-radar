from fastapi import APIRouter, HTTPException
from redis import Redis
import requests
import os
import json

NEWS_API_API_KEY = os.getenv("NEWS_API_API_KEY")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

router = APIRouter()
redis = Redis.from_url(REDIS_URL, decode_responses=True)


@router.get("/api/news_api/{name}")
async def get_news(name: str):
    cache_key = f"news_api_{name.lower().replace(' ', '_')}"

    cached_data = redis.get(cache_key)
    if cached_data:
        return json.loads(cached_data)

    api_url = "https://newsapi.org/v2/everything"
    params = {
        "q": f'"{name}"',
        "apiKey": NEWS_API_API_KEY,
        "language": "en",
        "excludeDomains": "boyculture.com",
    }

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        data = response.json()

        redis.set(cache_key, json.dumps(data), ex=3600)

        return data
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))

from fastapi import FastAPI
<<<<<<< HEAD
from fastapi.middleware.cors import CORSMiddleware
=======
>>>>>>> 418d141ef4f0e8e0a5202ebb941f866b7a8a3414
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware



load_dotenv()

from routers import (
    civic_info,
    news_api,
    open_secrets_ids,
    open_secrets_summary,
    open_secrets_contributions,
    congress_gov_photo,
    congress_gov_bills,
    pro_publica_ids,
    pro_publica_statements,
)

from dependencies import setup_dependencies

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
<<<<<<< HEAD
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
=======
    allow_origins=["*"],  # Adjust this to your frontend URL(s) in production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
>>>>>>> 418d141ef4f0e8e0a5202ebb941f866b7a8a3414
    allow_headers=["*"],
)

app.mount("/", StaticFiles(directory="build", html=True), name="static")

setup_dependencies(app)

app.include_router(civic_info.router)
app.include_router(news_api.router)
app.include_router(open_secrets_ids.router)
app.include_router(open_secrets_summary.router)
app.include_router(open_secrets_contributions.router)
app.include_router(open_secrets_contributions.router)
app.include_router(congress_gov_photo.router)
app.include_router(congress_gov_bills.router)
app.include_router(pro_publica_ids.router)
app.include_router(pro_publica_statements.router)

# 123

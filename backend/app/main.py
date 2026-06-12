from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

import os
import pandas as pd

from app.resume_parser import extract_text
from app.skill_extractor import extract_skills
from app.matching import calculate_match_score
from app.skill_gap import get_missing_skills

from app.database import engine
from app.models import Base

from app.repository import (
    save_candidate,
    get_all_candidates,
    get_candidate_by_id,
    get_top_candidates,
    get_dashboard_stats
)

# CREATE UPLOADS FOLDER AUTOMATICALLY
os.makedirs("uploads", exist_ok=True)

# CREATE DATABASE TABLES AUTOMATICALLY
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS FOR REACT FRONTEND
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Resume Screening System Running"
    }

@app.get("/export/excel")
def export_excel():

    candidates = get_all_candidates()

    rows = []

    for candidate in candidates:
        rows.append({
            "ID": candidate.id,
            "Filename": candidate.filename,
            "Match Score": candidate.match_score,
            "Recommendation": candidate.recommendation,
            "Skills": candidate.skills,
            "Missing Skills": candidate.missing_skills,
            "Created At": str(candidate.created_at)
        })

    df = pd.DataFrame(rows)

    file_path = "candidates_export.xlsx"

    df.to_excel(
        file_path,
        index=False
    )

    return FileResponse(
        file_path,
        filename="candidates_export.xlsx"
    )
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from app.resume_parser import extract_text
from app.skill_extractor import extract_skills
from app.matching import calculate_match_score
from app.skill_gap import get_missing_skills

from app.repository import (
    save_candidate,
    get_all_candidates,
    get_candidate_by_id,
    get_top_candidates,
    get_dashboard_stats
)

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


@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return {
        "filename": file.filename,
        "status": "uploaded"
    }


@app.post("/parse")
async def parse_resume(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    resume_text = extract_text(file_path)

    return {
        "filename": file.filename,
        "text": resume_text[:2000]
    }


@app.post("/skills")
async def get_skills_endpoint(
    file: UploadFile = File(...)
):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    resume_text = extract_text(file_path)

    skills = extract_skills(resume_text)

    return {
        "filename": file.filename,
        "skills": [str(skill) for skill in skills]
    }


@app.post("/match")
async def match_resume(
    file: UploadFile = File(...),
    jd: str = Form(...)
):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    resume_text = extract_text(file_path)

    skills = extract_skills(resume_text)

    missing_skills = get_missing_skills(
        resume_text,
        jd
    )

    match_score = calculate_match_score(
        resume_text,
        jd
    )

    if match_score >= 80:
        recommendation = "Highly Recommended"
    elif match_score >= 70:
        recommendation = "Shortlist"
    elif match_score >= 50:
        recommendation = "Review"
    else:
        recommendation = "Not Recommended"

    save_candidate(
        filename=file.filename,
        match_score=float(match_score),
        recommendation=recommendation,
        skills=skills,
        missing_skills=missing_skills
    )

    return {
        "filename": file.filename,
        "match_score": round(float(match_score), 2),
        "skills": [str(skill) for skill in skills],
        "missing_skills": [str(skill) for skill in missing_skills],
        "recommendation": recommendation
    }


@app.get("/candidates")
def candidates():

    data = get_all_candidates()

    result = []

    for candidate in data:

        result.append({
            "id": candidate.id,
            "filename": candidate.filename,
            "match_score": candidate.match_score,
            "recommendation": candidate.recommendation
        })

    return result


@app.get("/candidate/{candidate_id}")
def candidate(candidate_id: int):

    data = get_candidate_by_id(candidate_id)

    if not data:
        return {
            "message": "Candidate not found"
        }

    return {
        "id": data.id,
        "filename": data.filename,
        "match_score": data.match_score,
        "recommendation": data.recommendation,
        "skills": data.skills,
        "missing_skills": data.missing_skills,
        "created_at": str(data.created_at)
    }


@app.get("/top-candidates")
def top_candidates():

    data = get_top_candidates()

    result = []

    rank = 1

    for candidate in data:

        result.append({
            "rank": rank,
            "id": candidate.id,
            "filename": candidate.filename,
            "match_score": candidate.match_score,
            "recommendation": candidate.recommendation
        })

        rank += 1

    return result


@app.get("/dashboard/stats")
def dashboard_stats():

    return get_dashboard_stats()
from fastapi.responses import FileResponse
import pandas as pd


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
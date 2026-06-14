# AI Resume Screener & Candidate Ranking System

## Overview

AI Resume Screener is a full-stack Applicant Tracking System (ATS) that automatically analyzes resumes against job descriptions, calculates match scores, identifies missing skills, ranks candidates, and provides recruiter analytics.

The project consists of:

* FastAPI Backend
* React + Vite Frontend
* SQLite Database
* Render Deployment (Backend)
* Vercel Deployment (Frontend)

---

## Features

### Resume Parsing

* Upload PDF resumes
* Extract text using PDF processing libraries
* Parse resume content automatically

### Skill Extraction

* Detect technical and professional skills
* Match against predefined skill database
* Remove duplicate skills

### ATS Match Score

* Compare Resume vs Job Description
* TF-IDF Vectorization
* Cosine Similarity Scoring
* Generate ATS compatibility score

### Skill Gap Analysis

* Identify missing skills
* Compare resume skills with JD requirements
* Highlight candidate improvement areas

### Candidate Management

* Save candidate profiles
* Store ATS scores
* Store recommendations
* Maintain ranking history

### Recruiter Dashboard

* Total Candidates
* Average Score
* Highest Score
* Shortlisted Candidates

### Candidate Ranking

* Automatic ranking based on score
* Top candidate listing
* Detailed candidate profile view

### Export Features

* Export candidate data to Excel
* Export candidate reports to PDF

---

## Tech Stack

### Frontend

* React
* Vite
* Axios
* React Router
* Recharts
* jsPDF
* jspdf-autotable

### Backend

* FastAPI
* Uvicorn
* SQLAlchemy
* Scikit-Learn
* Pandas
* PDFPlumber

### Database

* SQLite

### Deployment

* Frontend: Vercel
* Backend: Render

---

## Project Structure

```text
AI_Resume_Screener
│
├── backend
│   ├── app
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── repository.py
│   │   ├── resume_parser.py
│   │   ├── skill_extractor.py
│   │   ├── skill_gap.py
│   │   ├── matching.py
│   │   └── skills.py
│   │
│   ├── uploads
│   ├── requirements.txt
│   ├── render.yaml
│   └── runtime.txt
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## API Endpoints

### Upload Resume

```http
POST /upload
```

### Parse Resume

```http
POST /parse
```

### Extract Skills

```http
POST /skills
```

### Match Resume

```http
POST /match
```

### Candidate List

```http
GET /candidates
```

### Candidate Details

```http
GET /candidate/{candidate_id}
```

### Top Candidates

```http
GET /top-candidates
```

### Dashboard Analytics

```http
GET /dashboard/stats
```

### Export Excel

```http
GET /export/excel
```

---

## ATS Scoring Logic

The system uses:

* TF-IDF Vectorization
* Cosine Similarity

Formula:

```python
score = cosine_similarity(
    resume_vector,
    jd_vector
)
```

Score is converted into a percentage:

```python
match_score = score * 100
```

---

## Recommendation Rules

| Score    | Recommendation     |
| -------- | ------------------ |
| 80+      | Highly Recommended |
| 70-79    | Shortlist          |
| 50-69    | Review             |
| Below 50 | Not Recommended    |

---

## Deployment URLs

### Frontend

Deployed on Vercel

```text
https://ai-resume-screener-coral.vercel.app
```

### Backend

Deployed on Render

```text
https://ai-resume-screener-f0g1.onrender.com
```

### API Documentation

```text
https://ai-resume-screener-f0g1.onrender.com/docs
```

---

## Future Improvements

* AI-powered resume feedback
* Dynamic skill extraction using NLP
* Authentication and recruiter login
* Email notifications
* Interview scheduling
* PostgreSQL database
* Resume keyword optimization suggestions
* Multi-job candidate ranking

---

## Author

Aakash Kumar Yadav

Built as a Full Stack AI Resume Screening and Candidate Ranking System using FastAPI, React, Machine Learning, and Cloud Deployment.

from app.database import SessionLocal
from app.models import Candidate


def save_candidate(
    filename,
    match_score,
    recommendation,
    skills,
    missing_skills
):

    db = SessionLocal()

    candidate = Candidate(
        filename=filename,
        match_score=float(match_score),
        recommendation=recommendation,
        skills=", ".join(skills),
        missing_skills=", ".join(missing_skills)
    )

    db.add(candidate)
    db.commit()
    db.refresh(candidate)
    db.close()

    return candidate


def get_all_candidates():

    db = SessionLocal()

    candidates = db.query(Candidate).all()

    db.close()

    return candidates


def get_candidate_by_id(candidate_id):

    db = SessionLocal()

    candidate = (
        db.query(Candidate)
        .filter(Candidate.id == candidate_id)
        .first()
    )

    db.close()

    return candidate


def get_top_candidates():

    db = SessionLocal()

    candidates = (
        db.query(Candidate)
        .order_by(Candidate.match_score.desc())
        .all()
    )

    db.close()

    return candidates


def get_dashboard_stats():

    db = SessionLocal()

    candidates = db.query(Candidate).all()

    total_candidates = len(candidates)

    if total_candidates == 0:

        db.close()

        return {
            "total_candidates": 0,
            "average_score": 0,
            "highest_score": 0,
            "shortlisted": 0
        }

    scores = [candidate.match_score for candidate in candidates]

    average_score = sum(scores) / total_candidates

    highest_score = max(scores)

    shortlisted = len(
        [
            candidate
            for candidate in candidates
            if candidate.match_score >= 70
        ]
    )

    db.close()

    return {
        "total_candidates": total_candidates,
        "average_score": round(average_score, 2),
        "highest_score": round(highest_score, 2),
        "shortlisted": shortlisted
    }
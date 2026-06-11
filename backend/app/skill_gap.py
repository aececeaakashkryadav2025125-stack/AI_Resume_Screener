from app.skill_extractor import extract_skills


def get_missing_skills(
    resume_text,
    jd_text
):

    resume_skills = set(
        extract_skills(resume_text)
    )

    jd_skills = set(
        extract_skills(jd_text)
    )

    missing = list(
        jd_skills - resume_skills
    )

    return sorted(missing)
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def calculate_match_score(
    resume_text,
    jd_text
):
    documents = [
        resume_text,
        jd_text
    ]

    vectorizer = TfidfVectorizer()

    matrix = vectorizer.fit_transform(
        documents
    )

    score = cosine_similarity(
        matrix[0:1],
        matrix[1:2]
    )[0][0]

    return float(score * 100)
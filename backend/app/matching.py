from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

_model = None


def get_model():
    global _model

    if _model is None:
        _model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

    return _model


def calculate_match_score(
    resume_text,
    jd_text
):
    model = get_model()

    resume_embedding = model.encode(
        [resume_text]
    )

    jd_embedding = model.encode(
        [jd_text]
    )

    score = cosine_similarity(
        resume_embedding,
        jd_embedding
    )[0][0]

    return float(score * 100)
from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Text,
    TIMESTAMP
)

from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()


class Candidate(Base):

    __tablename__ = "candidates"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    filename = Column(String(255))

    match_score = Column(Float)

    recommendation = Column(String(100))

    skills = Column(Text)

    missing_skills = Column(Text)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )
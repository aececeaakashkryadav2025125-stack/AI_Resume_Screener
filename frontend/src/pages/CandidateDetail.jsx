import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function CandidateDetail() {
  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    api
      .get(`/candidate/${id}`)
      .then((res) => setCandidate(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!candidate) {
    return <h2>Loading Candidate...</h2>;
  }

  return (
    <div>
      <h1>Candidate Details</h1>

      <p>
        <strong>ID:</strong> {candidate.id}
      </p>

      <p>
        <strong>Filename:</strong> {candidate.filename}
      </p>

      <p>
        <strong>Match Score:</strong> {candidate.match_score}
      </p>

      <p>
        <strong>Recommendation:</strong> {candidate.recommendation}
      </p>

      <p>
        <strong>Skills:</strong>
      </p>

      <p>{candidate.skills}</p>

      <p>
        <strong>Missing Skills:</strong>
      </p>

      <p>{candidate.missing_skills}</p>

      <p>
        <strong>Created At:</strong> {candidate.created_at}
      </p>

      <br />

      <Link to="/">← Back to Dashboard</Link>
    </div>
  );
}

export default CandidateDetail;
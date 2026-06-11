import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function TopCandidates() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    api
      .get("/top-candidates")
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((err) => {
        console.error(
          "Failed to load top candidates:",
          err
        );
      });
  }, []);

  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "🏅";
  };

  return (
    <div className="leaderboard-container">
      <h1>🏆 Top Candidates Leaderboard</h1>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Filename</th>
            <th>Score</th>
            <th>Recommendation</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map((candidate) => (
            <tr
              key={candidate.id}
              className={
                candidate.rank === 1
                  ? "gold-row"
                  : candidate.rank === 2
                  ? "silver-row"
                  : candidate.rank === 3
                  ? "bronze-row"
                  : ""
              }
            >
              <td>
                {getMedal(candidate.rank)}
                {" "}
                #{candidate.rank}
              </td>

              <td>
                <Link
                  to={`/candidate/${candidate.id}`}
                >
                  {candidate.filename}
                </Link>
              </td>

              <td>
                <span className="score-badge">
                  {Number(
                    candidate.match_score
                  ).toFixed(2)}
                </span>
              </td>

              <td>
                <span className="recommendation-badge">
                  {candidate.recommendation}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopCandidates;
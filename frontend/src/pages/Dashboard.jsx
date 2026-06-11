import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/dashboard/stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!stats) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div
      style={{
        width: "90%",
        margin: "40px auto",
        textAlign: "center"
      }}
    >
      <h1>Recruiter Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px,1fr))",
          gap: "20px",
          marginTop: "30px"
        }}
      >
        <div className="dashboard-card">
          <h3>Total Candidates</h3>
          <h1>{stats.total_candidates}</h1>
        </div>

        <div className="dashboard-card">
          <h3>Average Score</h3>
          <h1>{stats.average_score}</h1>
        </div>

        <div className="dashboard-card">
          <h3>Highest Score</h3>
          <h1>{stats.highest_score}</h1>
        </div>

        <div className="dashboard-card">
          <h3>Shortlisted</h3>
          <h1>{stats.shortlisted}</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
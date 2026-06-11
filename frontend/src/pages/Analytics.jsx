import { useEffect, useState } from "react";
import api from "../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

function Analytics() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    api
      .get("/candidates")
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const chartData = candidates.map((candidate) => ({
    name: candidate.filename.substring(0, 15),
    score: Number(candidate.match_score)
  }));

  return (
    <div
      style={{
        width: "90%",
        height: "500px",
        margin: "40px auto"
      }}
    >
      <h1>Candidate Score Analytics</h1>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis domain={[0, 100]} />

          <Tooltip />

        <Bar
  dataKey="score"
  fill="#00C853"
  radius={[8, 8, 0, 0]}
  barSize={80}
/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Analytics;
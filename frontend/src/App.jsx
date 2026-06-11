import { Routes, Route } from "react-router-dom";

import ResumeMatch from "./pages/ResumeMatch";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import TopCandidates from "./pages/TopCandidates";
import Candidates from "./pages/Candidates";
import CandidateDetail from "./pages/CandidateDetail";

function HomePage() {
  return (
    <div>
      <ResumeMatch />

      <hr />

      <Dashboard />

      <hr />

      <Analytics />

      <hr />

      <TopCandidates />

      <hr />

      <Candidates />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/candidate/:id"
        element={<CandidateDetail />}
      />
    </Routes>
  );
}

export default App;
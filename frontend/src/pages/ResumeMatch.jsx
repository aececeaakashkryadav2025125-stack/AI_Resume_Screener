import { useState } from "react";
import api from "../services/api";

function ResumeMatch() {

  const [file, setFile] = useState(null);

  const [jd, setJd] = useState("");

  const [result, setResult] = useState(null);

  const submitResume = async () => {

    const formData = new FormData();

    formData.append("file", file);

    formData.append("jd", jd);

    const response = await api.post(
      "/match",
      formData
    );

    setResult(response.data);
  };

  return (
    <div>

      <h1>Resume Matcher</h1>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <br />
      <br />

      <textarea
        rows="10"
        cols="70"
        placeholder="Paste Job Description"
        value={jd}
        onChange={(e) =>
          setJd(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={submitResume}>
        Match Resume
      </button>

      {result && (
        <div>

          <h2>Result</h2>

          <p>
            Match Score:
            {result.match_score}
          </p>

          <p>
            Recommendation:
            {result.recommendation}
          </p>

          <p>
            Skills:
            {result.skills.join(", ")}
          </p>

          <p>
            Missing Skills:
            {result.missing_skills.join(", ")}
          </p>

        </div>
      )}

    </div>
  );
}

export default ResumeMatch;
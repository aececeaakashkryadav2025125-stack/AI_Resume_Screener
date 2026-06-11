import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import api from "../services/api";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api
      .get("/candidates")
      .then((res) => setCandidates(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.filename
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All"
        ? true
        : candidate.recommendation === filter;

    return matchesSearch && matchesFilter;
  });

  const downloadExcel = () => {
    window.open(
      "http://127.0.0.1:8000/export/excel",
      "_blank"
    );
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "AI Resume Screening Report",
      14,
      20
    );

    autoTable(doc, {
      startY: 30,

      head: [
        [
          "ID",
          "Filename",
          "Score",
          "Recommendation"
        ]
      ],

      body: filteredCandidates.map(
        (candidate) => [
          candidate.id,
          candidate.filename,
          candidate.match_score,
          candidate.recommendation
        ]
      )
    });

    doc.save(
      "candidates_report.pdf"
    );
  };

  return (
    <div>
      <h1>Candidates</h1>

      <input
        type="text"
        placeholder="Search candidate..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <br />
      <br />

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
      >
        <option value="All">
          All
        </option>

        <option value="Highly Recommended">
          Highly Recommended
        </option>

        <option value="Shortlist">
          Shortlist
        </option>

        <option value="Review">
          Review
        </option>

        <option value="Not Recommended">
          Not Recommended
        </option>
      </select>

      <br />
      <br />

      <button
        onClick={downloadExcel}
      >
        Export Excel
      </button>

      <button
        onClick={exportPDF}
        style={{
          marginLeft: "10px"
        }}
      >
        Export PDF
      </button>

      <br />
      <br />

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Filename</th>
            <th>Score</th>
            <th>Recommendation</th>
          </tr>
        </thead>

        <tbody>
          {filteredCandidates.map(
            (candidate) => (
              <tr
                key={candidate.id}
              >
                <td>
                  {candidate.id}
                </td>

                <td>
                  <Link
                    to={`/candidate/${candidate.id}`}
                  >
                    {
                      candidate.filename
                    }
                  </Link>
                </td>

                <td>
                  {
                    candidate.match_score
                  }
                </td>

                <td>
                  {
                    candidate.recommendation
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Candidates;
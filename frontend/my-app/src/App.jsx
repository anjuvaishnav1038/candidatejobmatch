import React, { useState } from "react";
const API_URL = "http://localhost:8084/api/jobmatcandidatematch/";

export default function App() {
  const [files, setFiles] = useState([]);
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async () => {
    if (!files.length) {
      alert("Upload resume PDF");
      return;
    }
    if (!jdText.trim()) {
      alert("Paste Job Description");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    for (let f of files) formData.append("files", f);
    formData.append("jd_text", jdText);

    try {
      const res = await fetch(API_URL, { method: "POST", body: formData });
      const data = await res.json();

      let parsed = JSON.parse(data.match_score);
      setResult(parsed);

    } catch (err) {
      alert("Backend error");
      console.error(err);
    }

    setLoading(false);
  };

  const SkillTag = ({ text, color }) => (
    <span
      style={{
        backgroundColor: color,
        padding: "6px 12px",
        borderRadius: "20px",
        margin: "4px",
        fontSize: "14px",
        display: "inline-block",
        fontWeight: "500",
      }}
    >
      {text}
    </span>
  );
  return (
  <div
    style={{
      minHeight: "100vh",
      background: "#111",
      color: "white",
      fontFamily: "Arial",
      padding: "40px",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "flex-start",
      boxSizing: "border-box",
    }}
  >
    <h1
      style={{
        fontSize: "38px",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "40px",
        width: "100%",
      }}
    >
      Resume – Job Match (AI + RAG)
    </h1>

    {/* Input section */}
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        background: "#1a1a1a",
        padding: "30px",
        borderRadius: "12px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      <label style={{ fontSize: "16px", fontWeight: "600" }}>
        Upload Resume (PDF)
      </label>
      <input
        type="file"
        multiple
        accept="application/pdf"
        onChange={handleFileChange}
        style={{
          marginTop: "10px",
          marginBottom: "20px",
          display: "block",
          width: "100%",
        }}
      />

      <label style={{ fontSize: "16px", fontWeight: "600" }}>
        Job Description
      </label>
      <textarea
        rows={6}
        placeholder="Paste job description..."
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "10px",
          background: "#222",
          color: "white",
          borderRadius: "8px",
          border: "1px solid #444",
          marginBottom: "20px",
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%",
          background: "#4b7cff",
          padding: "14px",
          borderRadius: "10px",
          border: "none",
          fontSize: "20px",
          color: "white",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        {loading ? "Processing..." : "Match Resume"}
      </button>
    </div>

    {/* Results */}
    {result && (
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          background: "#1a1a1a",
          padding: "30px",
          borderRadius: "12px",
          margin: "40px auto",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ fontSize: "26px", fontWeight: "bold" }}>
          Match Results
        </h2>

        <div style={{ marginTop: "10px", fontSize: "18px" }}>
          <strong>Match Score:</strong>{" "}
          <span
            style={{
              background: "#0f8a2b",
              padding: "5px 15px",
              borderRadius: "20px",
              marginLeft: "10px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {result.match_percentage}%
          </span>
        </div>

        <p style={{ marginTop: "15px", fontSize: "18px" }}>
          <strong>Final Verdict:</strong> {result.final_verdict}
        </p>

        <div style={{ marginTop: "25px" }}>
          <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>
            Strong Match Skills
          </h3>
          <div>
            {result.strong_match_skills.map((s, i) => (
              <SkillTag key={i} text={s} color="#003cff33" />
            ))}
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>
            Missing Skills
          </h3>
          <div>
            {result.missing_skills.map((s, i) => (
              <SkillTag key={i} text={s} color="#ff000033" />
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);
} 

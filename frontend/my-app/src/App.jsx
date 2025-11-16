// import React, { useState, useRef } from "react";

// const API_URL = "http://localhost:8084/api/jobmatcandidatematch/";

// export default function App() {
//   const [files, setFiles] = useState([]);
//   const [jdText, setJdText] = useState("");
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fileInputRef = useRef();

//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//   };

//   const handleSubmit = async () => {
//     if (!files.length) {
//       alert("Please upload at least one PDF resume.");
//       return;
//     }
//     if (!jdText.trim()) {
//       alert("Job Description is required.");
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     for (let file of files) {
//       formData.append("files", file);
//     }
//     formData.append("jd_text", jdText);

//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error("Backend error");
//       }

//       const data = await res.json();
//       setResponse(data);

//     } catch (err) {
//       console.error(err);
//       setResponse({ error: "Failed to connect to backend" });
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: "30px", fontFamily: "Arial" }}>
//       <h1>Resume – Job Match (RAG + LLM)</h1>

//       {/* Upload PDF(s) */}
//       <div>
//         <input
//           type="file"
//           ref={fileInputRef}
//           multiple
//           accept="application/pdf"
//           onChange={handleFileChange}
//         />
//       </div>

//       {/* Job Description textarea */}
//       <div style={{ marginTop: "20px" }}>
//         <textarea
//           rows={6}
//           style={{ width: "100%", padding: "10px" }}
//           placeholder="Paste Job Description here..."
//           value={jdText}
//           onChange={(e) => setJdText(e.target.value)}
//         />
//       </div>

//       {/* Submit button */}
//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         style={{
//           marginTop: "20px",
//           padding: "10px 25px",
//           fontSize: "18px",
//           cursor: "pointer",
//         }}
//       >
//         {loading ? "Processing..." : "Match Resume"}
//       </button>

//       {/* Response Box */}
//       <div style={{ marginTop: "30px" }}>
//         <h3>Response:</h3>
//         <pre
//           style={{
//             background: "#505884ff",
//             padding: "20px",
//             borderRadius: "10px",
//           }}
//         >
//           {response ? JSON.stringify(response, null, 2) : "No response yet."}
//         </pre>
//       </div>
//     </div>
//   );
// }



// import React, { useState, useRef } from "react";

// const API_URL = "http://localhost:8084/api/jobmatcandidatematch/";

// export default function App() {
//   const [files, setFiles] = useState([]);
//   const [jdText, setJdText] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fileInputRef = useRef();

//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//   };

//   const handleSubmit = async () => {
//     if (!files.length) {
//       alert("Please upload at least one PDF resume.");
//       return;
//     }
//     if (!jdText.trim()) {
//       alert("Job Description is required.");
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     for (let file of files) {
//       formData.append("files", file);
//     }
//     formData.append("jd_text", jdText);

//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       // Parse FastAPI response JSON string
//       const parsed = JSON.parse(data.match_score);

//       setResult(parsed);

//     } catch (err) {
//       console.error(err);
//       setResult({ error: "Failed to connect to backend" });
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
//         <h1 className="text-3xl font-bold text-center">
//           Resume – Job Match (AI + RAG)
//         </h1>
//       </div>

//       <div className="mt-10 max-w-4xl mx-auto">
//         {/* Upload Section */}
//         <div className="bg-white p-6 rounded-xl shadow-md mb-6">
//           <label className="block text-lg font-semibold mb-2">
//             Upload Resume (PDF)
//           </label>
//           <input
//             type="file"
//             multiple
//             accept="application/pdf"
//             onChange={handleFileChange}
//             className="w-full border p-3 rounded-lg"
//           />

//           {/* JD Text */}
//           <label className="block text-lg font-semibold mt-6 mb-2">
//             Job Description
//           </label>
//           <textarea
//             rows={6}
//             placeholder="Paste job description here..."
//             value={jdText}
//             onChange={(e) => setJdText(e.target.value)}
//             className="w-full border p-3 rounded-lg"
//           />

//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg text-lg font-semibold transition"
//           >
//             {loading ? "Processing..." : "Match Resume"}
//           </button>
//         </div>

//         {/* Results Section */}
//         {result && (
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Match Results</h2>

//             {result.error ? (
//               <p className="text-red-500">{result.error}</p>
//             ) : (
//               <>
//                 {/* Match Score Badge */}
//                 <div className="flex items-center gap-3 mb-4">
//                   <span className="text-lg font-semibold">
//                     Match Score:
//                   </span>
//                   <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-lg font-bold">
//                     {result.match_percentage}%
//                   </span>
//                 </div>

//                 <p className="text-lg mb-4">
//                   <strong>Final Verdict:</strong> {result.final_verdict}
//                 </p>

//                 {/* Strong Match Skills */}
//                 <div className="mb-4">
//                   <h3 className="text-xl font-bold mb-2">Strong Match Skills</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {result.strong_match_skills.map((skill, idx) => (
//                       <span
//                         key={idx}
//                         className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Missing Skills */}
//                 <div className="mt-6">
//                   <h3 className="text-xl font-bold mb-2 text-red-600">
//                     Missing Skills
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {result.missing_skills.map((skill, idx) => (
//                       <span
//                         key={idx}
//                         className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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

  // return (
  //   <div
  //     style={{
  //       minHeight: "100vh",
  //       background: "#111",
  //       color: "white",
  //       fontFamily: "Arial",
  //       padding: "40px",
  //     }}
  //   >
  //     <h1
  //       style={{
  //         fontSize: "38px",
  //         fontWeight: "bold",
  //         textAlign: "center",
  //         marginBottom: "40px",
  //       }}
  //     >
  //       Resume – Job Match (AI + RAG)
  //     </h1>

  //     {/* Upload + JD Box */}
  //     <div
  //       style={{
  //         maxWidth: "800px",
  //         margin: "0 auto",
  //         background: "#1a1a1a",
  //         padding: "25px",
  //         borderRadius: "10px",
  //       }}
  //     >
  //       <label style={{ fontSize: "16px", fontWeight: "600" }}>
  //         Upload Resume (PDF)
  //       </label>
  //       <input
  //         type="file"
  //         multiple
  //         accept="application/pdf"
  //         onChange={handleFileChange}
  //         style={{
  //           marginTop: "10px",
  //           marginBottom: "20px",
  //           display: "block",
  //           width: "100%",
  //         }}
  //       />

  //       <label style={{ fontSize: "16px", fontWeight: "600" }}>
  //         Job Description
  //       </label>
  //       <textarea
  //         rows={6}
  //         placeholder="Paste job description..."
  //         value={jdText}
  //         onChange={(e) => setJdText(e.target.value)}
  //         style={{
  //           width: "100%",
  //           padding: "12px",
  //           marginTop: "10px",
  //           background: "#222",
  //           color: "white",
  //           borderRadius: "8px",
  //           border: "1px solid #444",
  //           marginBottom: "20px",
  //         }}
  //       />

  //       <button
  //         onClick={handleSubmit}
  //         disabled={loading}
  //         style={{
  //           width: "100%",
  //           background: "#4b7cff",
  //           padding: "12px",
  //           borderRadius: "8px",
  //           border: "none",
  //           fontSize: "18px",
  //           color: "white",
  //           cursor: "pointer",
  //         }}
  //       >
  //         {loading ? "Processing..." : "Match Resume"}
  //       </button>
  //     </div>

  //     {/* RESULTS */}
  //     {result && (
  //       <div
  //         style={{
  //           maxWidth: "800px",
  //           margin: "40px auto",
  //           background: "#1a1a1a",
  //           padding: "30px",
  //           borderRadius: "10px",
  //         }}
  //       >
  //         <h2 style={{ fontSize: "26px", fontWeight: "bold" }}>
  //           Match Results
  //         </h2>

  //         <div style={{ marginTop: "10px", fontSize: "18px" }}>
  //           <strong>Match Score:</strong>{" "}
  //           <span
  //             style={{
  //               background: "#0f8a2b",
  //               padding: "5px 15px",
  //               borderRadius: "20px",
  //               marginLeft: "10px",
  //               color: "white",
  //               fontWeight: "bold",
  //             }}
  //           >
  //             {result.match_percentage}%
  //           </span>
  //         </div>

  //         <p style={{ marginTop: "15px", fontSize: "18px" }}>
  //           <strong>Final Verdict:</strong> {result.final_verdict}
  //         </p>

  //         <div style={{ marginTop: "25px" }}>
  //           <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>
  //             Strong Match Skills
  //           </h3>
  //           <div>
  //             {result.strong_match_skills.map((s, i) => (
  //               <SkillTag key={i} text={s} color="#003cff33" />
  //             ))}
  //           </div>
  //         </div>

  //         <div style={{ marginTop: "30px" }}>
  //           <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>
  //             Missing Skills
  //           </h3>
  //           <div>
  //             {result.missing_skills.map((s, i) => (
  //               <SkillTag key={i} text={s} color="#ff000033" />
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
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

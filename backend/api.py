from fastapi import FastAPI
from pydantic import BaseModel
from typing import List 
from fastapi import UploadFile, File, HTTPException, Form
from fastapi.responses import JSONResponse
import os
import tempfile
import shutil
from pdfminer.high_level import extract_text
from utils.extract_jd_skills import extract_jd_skills
from utils.faiss_index import build_faiss_index
from utils.resume_parser import analyze_resume
from utils.chunk_jd import chunk_text
from utils.rag import rag_search
from utils.llm_match_score import llm_match_score
class RequestParamerters(BaseModel):
    resume_path: str
    job_description: str

app=FastAPI(title="RAG based Resume Job Description Matcher" )
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",   # React Vite default
    "http://localhost:3000",   # React default
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/hello")
def hello():
    return {"message": "FastAPI connected successfully!"}

@app.post("/api/jobmatcandidatematch/")
async def parse_resume_folder(files: List[UploadFile] = File(...),
                              jd_text: str = Form(...)):
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded")

    results = []
    temp_dir = tempfile.mkdtemp()          # one temp folder for the whole request

    try:
        # ---- Save every uploaded file to the temp folder ----
        saved_paths = []
        for file in files:
            if not file.filename.lower().endswith(".pdf"):
                continue                     # skip non-PDFs (optional)

            file_path = os.path.join(temp_dir, file.filename)
            with open(file_path, "wb") as f:
                content = await file.read()
                f.write(content)
            saved_paths.append(file_path)

        # ---- Process each PDF ----
        for pdf_path in saved_paths:
            try:
                text = extract_text(pdf_path)
                analysis = analyze_resume(text, model_name="llama3.1:8b")
                results.append({
                    "filename": os.path.basename(pdf_path),
                    "analysis": analysis
                })
            except Exception as e:
                results.append({
                    "filename": os.path.basename(pdf_path),
                    "error": str(e)
                })
            # ans=JSONResponse(content={"results": results})/
            ans={"results": results}
            resume_data = ans["results"][0]["analysis"]
            # resume_text = " ".join(resume_data["skills"])
            resume_data = ans["results"][0]["analysis"]

            print("RESUME DATA:", resume_data)

            # Extract skills safely
            skills = resume_data.get("skills")

            if skills and isinstance(skills, list):
                resume_text = " ".join(skills)
            else:
                # Fallback if skills not present
                print("WARNING: 'skills' key not found in resume_data, using full text instead.")
                resume_text = text

            jd_skills = extract_jd_skills(jd_text)
            # print(jd_skills)
            chunks = chunk_text(jd_text)
            index, emb = build_faiss_index(chunks)
            retrieved = rag_search(resume_text, chunks, index)
            score = llm_match_score(resume_text, retrieved)
            return {"match_score": score}

        # return JSONResponse(content={"results": results})

    finally:
        # ---- Clean up temp folder ----
        shutil.rmtree(temp_dir, ignore_errors=True)



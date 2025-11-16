import ollama
def llm_match_score(resume_text, jd_chunks, model="llama3.1:8b"):
    prompt = f"""
You are an extremely strict matcher. 
DO NOT hallucinate skills. Only use skills explicitly found in the text.

=== RESUME TEXT ===
{resume_text}

=== JD RELEVANT CHUNKS (RAG) ===
{jd_chunks}

INSTRUCTIONS:
1. Extract skills appearing in BOTH resume and JD — do NOT infer skills.
2. Extract missing skills = skills present in JD but NOT present in resume.
3. Never guess or add any skill not directly found in the texts.
4. Output ONLY valid JSON — no explanation, no natural language.
5.If matched skills are 60% or more of JD skills, final_verdict is "Strong match".
6.If matched skills are between 40% and 60%, final_verdict is "Medium match".
7.If matched skills are below 35%, final_verdict is "Poor match".

RETURN STRICT JSON ONLY IN THIS FORMAT:
{{
  "match_percentage": <number>,
  "strong_match_skills": ["skill1", "skill2"],
  "missing_skills": ["skill3", "skill4"],
  "final_verdict": "Strong match" or "Medium match" or "Poor match"
}}
"""

    response = ollama.chat(
        model=model,
        messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]

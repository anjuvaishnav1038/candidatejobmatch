import ollama
def extract_jd_skills(jd_text, model="llama3.1:8b"):
    prompt = f"""
    Extract the main skill keywords from this Job Description.
    Return only comma-separated skills in plain text.

    JD:
    {jd_text}
    """

    response = ollama.chat(
        model=model,
        messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"].strip()

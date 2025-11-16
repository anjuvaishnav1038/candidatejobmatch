from utils.embedder import embedder
def rag_search(query, chunks, index, top_k=5):
    q_emb = embedder.encode([query], convert_to_numpy=True)
    D, I = index.search(q_emb, top_k)
    return [chunks[i] for i in I[0]]

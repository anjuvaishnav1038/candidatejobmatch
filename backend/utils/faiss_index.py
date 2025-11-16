from utils.embedder import embedder
import faiss
def build_faiss_index(chunks):
    embeddings = embedder.encode(chunks, convert_to_numpy=True)
    dim = embeddings.shape[1]
    
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)
    
    return index, embeddings

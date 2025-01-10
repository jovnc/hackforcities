from docling.document_converter import DocumentConverter

from langchain.docstore.document import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

# from langchain.chains import RetrievalQA
from langchain_community.vectorstores import Qdrant

from langchain_openai import OpenAIEmbeddings, ChatOpenAI
# from langchain_qdrant import QdrantVectorStore

from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance

import os 
from dotenv import load_dotenv

load_dotenv()

qdrant_client = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY"),
)

embeddings = OpenAIEmbeddings()

def pdf_processing(url):
    converter = DocumentConverter()
    result = converter.convert(url)
    docs = result.document.export_to_markdown()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=300,
        chunk_overlap=30,
    )

    chunks = text_splitter.split_text(docs)
    documents = []
    for chunk in chunks:
        content = chunk
        metadata = {
            "source": url
        }
        document = Document(page_content=content, metadata=metadata)
        documents.append(document)
    return documents

def vectorstore_ingest(url, id):
    docs = pdf_processing(url)
    collection_name = id

    qdrant_client.recreate_collection(
        collection_name=collection_name,
        vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
    )

    print("Collection created, ingesting documents...")

    vectorstore = Qdrant.from_documents(
        documents=docs,
        embedding=embeddings,
        collection_name=collection_name,
        url=os.getenv("QDRANT_URL"),
        api_key=os.getenv("QDRANT_API_KEY"),
    )

    return vectorstore

# def load_vectorstore(collection_name):
#     return Qdrant.from_existing_collection(
#         embedding=embeddings,
#         client=qdrant_client,
#         collection_name=collection_name,
#         url=os.getenv("QDRANT_URL"),
#         api_key=os.getenv("QDRANT_API_KEY"),
#     )

# def setup_qa_chain(collection_name):
#     retriever = load_vectorstore(collection_name)
#     llm = ChatOpenAI(model="gpt-4o") 
#     qa_chain = RetrievalQA.from_chain_type(
#         llm=llm,
#         retriever=retriever,
#         return_source_documents=True
#     )
#     return qa_chain
from docling.document_converter import DocumentConverter

from langchain.docstore.document import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings 
from langchain.vectorstores import Qdrant
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance

import os 
from dotenv import load_dotenv

load_dotenv("../.env")

qdrant_client = QdrantClient(
    host=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY"),
)
embeddings = OpenAIEmbeddings()

def pdf_processing(url):
    converter = DocumentConverter()
    result = converter.convert(url)
    docs = result.document.export_to_markdown()

    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=512,
        chunk_overlap=50,
    )

    chunks = text_splitter.split_documents(docs)
    documents = []
    for chunk in chunks:
        content = chunk.page_content
        metadata = {
            "source": url
        }
        document = Document(page_content=content, metadata=metadata)
        documents.append(document)

    return documents

def vectorstore_ingest(url, id):
    docs = pdf_processing(url)
    qdrant_client.recreate_collection(
    collection_name=id,
    vectors_config=VectorParams(size=1536, distance=Distance.COSINE))

    vectorstore = Qdrant.from_documents(
        documents=docs,
        embeddings=embeddings,
        client=qdrant_client,
        collection_name=id
    )

    return vectorstore

def load_vectorstore(url, id):
    return Qdrant(
        client=qdrant_client,
        collection_name=id,
        embedding=embeddings,
    ).as_retriever()
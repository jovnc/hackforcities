from docling.document_converter import DocumentConverter

from langchain.docstore.document import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Qdrant
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

from qdrant_client import QdrantClient
from qdrant_client.http.models import VectorParams, Distance
from langchain_qdrant import QdrantVectorStore

from helpers.prompts import custom_prompt

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

def load_vectorstore(collection_name):
    vector_store = QdrantVectorStore(
        client=qdrant_client,
        collection_name=collection_name,
        embedding=embeddings,
    )
    return vector_store

def answer_query(collection_name, query):
    vectorstore = load_vectorstore(collection_name)
    llm = ChatOpenAI(model="gpt-4o") 
    
    system_prompt = custom_prompt(vectorstore, query)
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                system_prompt,
            ),
            ("human", "{input}"),
        ]
    )
    chain = prompt | llm


    res = chain.invoke({
        "input": query,
    })
    msg = res.content

    return msg
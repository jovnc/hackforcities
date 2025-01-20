from docling.document_converter import DocumentConverter

from langchain.docstore.document import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

from qdrant_client import QdrantClient
from qdrant_client.http.models import VectorParams, Distance
from langchain_qdrant import QdrantVectorStore
from uuid import uuid4

from helpers.prompts import custom_prompt, generate_question_custom_prompt, generate_summary_custom_prompt

import os 
from dotenv import load_dotenv

load_dotenv()

qdrant_client = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY"),
)

# initialise AI components
embeddings = OpenAIEmbeddings()
llm = ChatOpenAI(model="gpt-4o") 


# Function to process the pdf file
def pdf_processing(url):
    converter = DocumentConverter()
    result = converter.convert(url)
    docs = result.document.export_to_markdown()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
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

    vector_store = QdrantVectorStore(
        client=qdrant_client,
        collection_name=collection_name,
        embedding=embeddings,
    )


    uuids = [str(uuid4()) for _ in range(len(docs))]
    vector_store.add_documents(documents=docs, ids=uuids)

    return vector_store


# Function to load the vectorstore
def load_vectorstore(collection_name):
    vector_store = QdrantVectorStore(
        client=qdrant_client,
        collection_name=collection_name,
        embedding=embeddings,
    )
    return vector_store

# Function to answer the query
def answer_query(collection_name, query):
    vectorstore = load_vectorstore(collection_name)
    
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


# Function to generate question
def generate_question(collection_name, title, level):
    try:
        vectorstore = load_vectorstore(collection_name)

        query = f"{title} for PSLE {level}"
        
        system_prompt = generate_question_custom_prompt(vectorstore, query)
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
    except Exception as e:
        print(str(e))
        return str(e)


# Function to generate summary
def generate_summary(collection_name, title, level):
    try:

        vectorstore = load_vectorstore(collection_name)

        query = f"{title} for PSLE {level}"
        
        system_prompt = generate_summary_custom_prompt(vectorstore, query)
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
    
    except Exception as e:
            print(str(e))
            return str(e)
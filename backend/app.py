from flask import Flask, jsonify, request
from flask_cors import CORS
from helpers.preprocessing import load_vectorstore, vectorstore_ingest
from helpers.prompts import question_prompt
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello from Flask backend!'})

@app.route('/api/upload', methods=['POST'])
def upload_file():
    
    # store file in embeddings (qdrant)

    return jsonify({"message": f"File uploaded successfully"}), 200

@app.route("/chat", methods=["POST"])
def chat_with_pdf():
    try:
        retriever = load_vectorstore("sss", "sss")
        llm = ChatOpenAI(model="gpt-4o")
        # system_prompt = question_prompt()
        qa_chain = RetrievalQA.from_chain_type(
            llm=ChatOpenAI("gpt-4o"),  # Use any supported LLM
            retriever=retriever,
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

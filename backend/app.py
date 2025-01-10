from flask import Flask, jsonify, request
from flask_cors import CORS
from helpers.preprocessing import vectorstore_ingest

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello from Flask backend!'})

@app.route('/api/upload', methods=['POST', 'OPTIONS'])
def upload_file():

    if request.method == 'OPTIONS':
        return jsonify({"message": "Options request received"}), 200

    data = request.get_json()
    id = data['id']
    url = data['fileUrl']


    if not id or not url:
        return jsonify({"error": "Missing required fields"}), 400
    
    # store file in embeddings (qdrant)
    try:
        vectorstore = vectorstore_ingest(url, id)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({
            "message": "File processed successfully",
        }), 200

# @app.route("/api/chat", methods=["POST"])
# def chat_with_pdf():
#     try:
#         retriever = load_vectorstore("sss", "sss")
#         llm = ChatOpenAI(model="gpt-4o")
#         # system_prompt = question_prompt()
#         qa_chain = RetrievalQA.from_chain_type(
#             llm=ChatOpenAI("gpt-4o"),  # Use any supported LLM
#             retriever=retriever,
#         )
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=8000, debug=True)

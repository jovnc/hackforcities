from flask import Flask, jsonify, request
from flask_cors import CORS
from helpers.preprocessing import answer_query, vectorstore_ingest, generate_question, generate_summary

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/', methods=['GET'])
def home():
    return "<h1>Flask backend</h1>"

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello from Flask backend!'})

# Upload file to the system
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

# Chat with the pdf
@app.route("/api/chat", methods=["POST", "OPTIONS"])
def chat_with_pdf():
    if request.method == 'OPTIONS':
        return jsonify({"message": "Options request received"}), 200

    data = request.get_json()
    id = data['id']
    message = data['message']

    if not id or not message:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        msg = answer_query(id, message)

        return jsonify({
            "message": msg,
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Generate questions from the pdf
@app.route("/api/generate", methods=["POST", "OPTIONS"])
def generate_questions():
    if request.method == 'OPTIONS':
        return jsonify({"message": "Options request received"}), 200

    data = request.get_json()
    id = data['id']
    title = data['title']
    level = data['level']

    if not id or not title or not level:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        msg = generate_question(id, title, level)

        return jsonify({
            "message": msg,
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Generate summary from the pdf
@app.route("/api/summary", methods=["POST", "OPTIONS"])
def summary():
    if request.method == 'OPTIONS':
        return jsonify({"message": "Options request received"}), 200

    data = request.get_json()
    id = data['id']
    title = data['title']
    level = data['level']

    if not id or not title or not level:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        msg = generate_summary(id, title, level)

        return jsonify({
            "message": msg,
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=8000, debug=True)

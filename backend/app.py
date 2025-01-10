import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})  # Enable CORS for all routes

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello from Flask backend!'})

@app.route('/api/upload', methods=['POST', 'OPTIONS'])
def upload_file():
    if request.method == "OPTIONS":
        # Handle CORS preflight request (return 200 OK with necessary headers)
        return "", 200
    
    # if 'file' not in request.files:
    #     return {"message": "No file part"}, 400
    # print(request.files['file'])
    print(request.data)
    title="test"

    # file = request.files['file']

    # if file.filename == '':
    #     return {"message": "No selected file"}, 400

    # filename = secure_filename(file.filename)
    # file.save(f"./uploads/{filename}")

    return {"message": f"File {title} uploaded successfully"}, 200

def process_pdf(file_path):
    # Load PDF
    loader = PyPDFLoader(file_path)
    documents = loader.load()

    # Split the document text into smaller chunks
    text_splitter = CharacterTextSplitter(chunk_size=512, chunk_overlap=50)
    chunks = text_splitter.split_documents(documents)

    # Create embeddings for the chunks
    vectorstore = Chroma.from_documents(chunks, embedding_model, persist_directory="./recordb")

    return vectorstore

if __name__ == '__main__':
    app.run(debug=True)

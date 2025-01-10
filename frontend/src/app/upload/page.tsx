"use client";
import { useState } from "react";
import { api } from "../../lib/axios"; // Import the api directly from axios.ts

function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
        setUploadStatus("Uploading...");
        const formData = new FormData();
        formData.append("file", file);

        // Directly using the `api` instance for the POST request
        // api.post("/upload", formData)
        // .then((response) => {
        //   setUploadStatus(response.data.message || "Upload successful!");
        // })
        // .catch((error) => {
        //   setUploadStatus("Error uploading file.");
        //   console.error("Error uploading file:", error);
        // });
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} accept=".pdf,.docx" required />
      <button type="submit">Upload</button>
      <p>{uploadStatus}</p>
    </form>
  );
}

export default UploadForm;

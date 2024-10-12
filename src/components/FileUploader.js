import React, { useState, useRef } from 'react';
import './FileUploader.css';

const FileUploader = ({ socket, roomId, onFileUpload }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleLoadToEditor = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      onFileUpload(file.name, fileContent);
    };
    reader.readAsText(file);
  };

  return (
    <div className="file-uploader">
      <div
        className="drop-zone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <p>Drag and drop files here or click to upload</p>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
          multiple
        />
      </div>
      <div className="uploaded-files">
        <h4>Uploaded Files:</h4>
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              {file.name}
              <button onClick={() => handleLoadToEditor(file)}>Load to Editor</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUploader;

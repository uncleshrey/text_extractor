import { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setText('');
      setProgress(0);
      setStatus('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-active');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-active');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-active');

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setText('');
      setProgress(0);
      setStatus('');
    }
  };

  const reset = () => {
    setImage(null);
    setText('');
    setProgress(0);
    setStatus('');
  };

  const extractText = async () => {
    if (!image) return;

    setIsLoading(true);
    setText('');

    try {
      const result = await Tesseract.recognize(
        image,
        'eng',
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              setProgress(parseInt(m.progress * 100));
              setStatus('Extracting text...');
            } else {
              setStatus(m.status);
            }
          }
        }
      );

      setText(result.data.text);
    } catch (err) {
      console.error(err);
      setText('Error extracting text. Please try again.');
    } finally {
      setIsLoading(false);
      setStatus('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Text Extractor</h1>
        <p>Upload an image to instantly extract text using OCR</p>
      </div>

      <div className="main-content">
        <div className="card">
          <div
            className="upload-area"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input').click()}
          >
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />

            {image ? (
              <img src={image} alt="Preview" className="image-preview" />
            ) : (
              <>
                <div className="upload-icon">📁</div>
                <div className="upload-text">Click to upload or drag & drop</div>
                <div className="upload-subtext">Supports JPG, PNG, BMP</div>
              </>
            )}
          </div>

          <div className="button-group">
            <button
              className="btn"
              onClick={extractText}
              disabled={!image || isLoading}
            >
              {isLoading ? 'Processing...' : 'Extract Text'}
            </button>
            {image && (
              <button
                className="btn btn-secondary"
                onClick={reset}
                disabled={isLoading}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="card">
          <div className="result-area">
            <div className="result-header">
              <span className="result-title">Extracted Text</span>
              <button className="copy-btn" onClick={copyToClipboard} disabled={!text}>
                Copy
              </button>
            </div>

            <textarea
              className="text-output"
              value={text}
              readOnly
              placeholder="Extracted text will appear here..."
            />

            {isLoading && (
              <div className="loading-overlay">
                <div className="spinner"></div>
                <div className="progress-text">{status} {progress > 0 && `${progress}%`}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

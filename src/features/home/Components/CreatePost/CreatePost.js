import React, { useRef, useState } from "react";
import "./CreatePost.css";

export default function CreatePost() {
  const selectRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [message, setMessage] = useState("");
  const [showResetButton, setShowResetButton] = useState(false);
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);

  const handleSelectChange = () => {
    if (selectRef.current) {
      selectRef.current.blur();
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMessage(`Image "${file.name}" selected`);
      setShowResetButton(true);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleTextChange = (e) => {
    setTextValue(e.target.value);

    const { scrollHeight, clientHeight } = e.target;
    const maxHeight = 80;

    if (scrollHeight > maxHeight) {
      setTextareaHeight(`${maxHeight}px`);
    } else {
      setTextareaHeight("auto");
    }

    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(scrollHeight, maxHeight)}px`;

    setHasScrollbar(scrollHeight > clientHeight);
    setShowResetButton(e.target.value.trim() !== "" || selectedFile !== null);
  };

  const handleReset = () => {
    setTextValue("");
    setSelectedFile(null);
    setTextareaHeight("auto");
    setMessage("");
    setShowResetButton(false);
    setIsTextAreaFocused(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleTextAreaFocus = () => {
    setIsTextAreaFocused(true);
  };

  const handleTextAreaBlur = () => {
    setIsTextAreaFocused(false);
  };

  const isPostButtonEnabled = textValue.trim() !== "" || selectedFile !== null;

  return (
    <div className="create-post">
      <div className="post shadow-sm p-3 bg-white rounded">
        <form action="">
          <div className="form-group-1 mb-3">
            <textarea
              placeholder="What's happening?"
              value={textValue}
              onChange={handleTextChange}
              rows="1"
              onFocus={handleTextAreaFocus}
              onBlur={handleTextAreaBlur}
              style={{
                width: "100%",
                resize: "none",
                overflowY: textValue ? "auto" : "hidden",
                height: textareaHeight,
                maxHeight: "150px",
                padding: "12px 15px",
                fontSize: "16px",
                lineHeight: "1.5",
                border: "1px solid #ccc",
                borderTopRightRadius: isTextAreaFocused ? "0" : (hasScrollbar ? "0" : "10px"),
                borderBottomRightRadius: isTextAreaFocused ? "0" : (hasScrollbar ? "0" : "10px"),
                borderRadius: hasScrollbar ? "10px 0px 0px 10px" : "10px",
                boxSizing: "border-box",
                outline: "none",
                transition: "border-color 0.3s ease, border-radius 0.3s ease",
                borderColor: isTextAreaFocused ? "#1682e8" : "#ccc"
              }}
            />
          </div>

          <div className="d-flex align-items-center mb-3" style={{ marginLeft: '-5.5%',overflowX:'auto' }}>
            <div className="pt-2">
              <div className="post-icons me-2">
                <i
                  style={{ color: '#1682e8', cursor: 'pointer', fontSize: '20px' }}
                  className="far fa-image"
                  onClick={handleUploadClick}
                ></i>
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
              </div>
            </div>

            <div className="p-0 m-0">
              <select
                ref={selectRef}
                className="form-select px-3 custom-select"
                aria-label="Select privacy"
                style={{
                  width: '110px',
                  appearance: "none",
                  padding: "5px 10px",
                  border: '2px solid #1682e8',
                  borderRadius: '30px',
                  color: '#1682e8',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  backgroundColor: '#fff',
                  transition: 'border-color 0.3s ease',
                }}
                onChange={handleSelectChange}
                onFocus={(e) => e.target.style.borderColor = "#0c62a8"}
                onBlur={(e) => e.target.style.borderColor = "#1682e8"}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="only_me">Only Me</option>
              </select>
            </div>

            <div className="ms-auto d-flex align-items-center">
              {showResetButton && (
                <button
                  type="button"
                  className="btn  p-2 fs-7 me-2"
                  style={{
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    
                    color: "black",
                    cursor: 'pointer',
                    
                  }}
                  onClick={handleReset}
                >
                 <i class="fa-solid fa-trash-can fs-5"></i>
                </button>
              )}
              <button
                disabled={!isPostButtonEnabled}
                className="btn btn-primary px-4 py-2 fs-7"
                type="submit"
                style={{
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  backgroundColor: '#1682e8',
                  color: "#ffffff",
                  cursor: isPostButtonEnabled ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Post
              </button>
            </div>
          </div>

          {/* Display message for image selection */}
          {message && (
            <div className="alert alert-info" role="alert" style={{ marginTop: '10px' }}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

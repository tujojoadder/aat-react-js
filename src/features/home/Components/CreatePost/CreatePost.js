import React, { useRef, useState } from "react";
import "./CreatePost.css";
import { useUserPostInsertMutation } from "../../../../services/postApi";
import { handleApiError } from "../../../handleApiError/handleApiError";
import { useDispatch } from "react-redux";
import { setToastSuccess } from "../../HomeSlice";

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
  const [audience, setAudience] = useState('public'); // New state for audience

  const [userPostInsert, { isLoading, isError, isSuccess, error }] = useUserPostInsertMutation();
  const dispatch = useDispatch();

  const handleSelectChange = (e) => {
    setAudience(e.target.value); // Set the audience
    if (selectRef.current) {
      selectRef.current.blur();
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setSelectedFile(file);
        setMessage('image selected');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", textValue);
    formData.append("audience", audience); // Add audience to FormData

    if (selectedFile || textValue.trim()) {
      formData.append("image_or_text", selectedFile ? "image" : "text");
    }
    
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const res = await userPostInsert(formData);
      if (res.data) {
        dispatch(setToastSuccess({ toastSuccess: 'Your post was created successfully' }));
        handleReset(); // Clear form after successful submission
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  return (
    <div className="create-post mb-3" >
      <div className="post shadow-sm p-3 bg-white rounded" >
        <form onSubmit={handleSubmit} >
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

          <div className="d-flex align-items-center mb-3 ms-md-4 ms-2 me-1" style={{ marginLeft: '-5.5%', overflowX: 'auto' }}>
            <div className="pt-2">
              <div className="post-icons me-md-2 p-0 ps-4 pe-1">
                <i
                  style={{ color: '#1682e8', cursor: 'pointer', fontSize: '20px' }}
                  className="far fa-image"
                  onClick={handleUploadClick}
                ></i>
                <input 
                disabled={isLoading}
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
              </div>
            </div>

            <div className="p-0 m-0">
              <select
              disabled={isLoading}
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
                disabled={isLoading}
                  type="button"
                  className="btn p-2 fs-7 me-2"
                  style={{
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: "black",
                    cursor: 'pointer',
                  }}
                  onClick={handleReset}
                >
                  <i className="fa-solid fa-trash-can fs-5"></i>
                </button>
              )}
              <button
                disabled={!isPostButtonEnabled || isLoading}
                className="btn btn-primary px-4 py-2 fs-7 me-3"
                type="submit"
                style={{
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  backgroundColor: '#1682e8',
                  color: "#ffffff",
                  cursor: isPostButtonEnabled && !isLoading ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.3s ease',
                }}
              >
                {isLoading ? "Posting..." : "Post"}
              </button>

             
            </div>
            
          </div>

        </form>
        {message && (
  <div
    className="image-selected-message me-2"
    style={{
      padding: '6px 12px',
      fontSize: '14px',
      fontWeight: '500',
      color: 'black',
      backgroundColor: '#f1f4f8',
      borderRadius: '12px',
      display: 'inline-block',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'opacity 0.3s ease',
      opacity: isLoading ? '0.6' : '1',
      marginLeft:'15px'
    }}
  >
    {message}
  </div>
)}

      </div>
    </div>
  );
}

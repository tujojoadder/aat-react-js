import React, { useRef, useState } from "react";
import image from "./logo.jpg";
import "./CreatePost.css";

export default function CreatePost() {
  const selectRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectChange = () => {
    // Remove focus from the select element programmatically
    if (selectRef.current) {
      selectRef.current.blur();
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log(file);
      // Perform additional operations like file upload
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="create-post">
    <div className="post">
      <form action="">
        <div className="form-group-1">
          <img src={image} alt="profile-pics" />
          <input type="text" placeholder="What's happening?" />
        </div>

        <div className="d-flex bd-highlight mb-3">
          <div className="pt-2 bd-highlight">
            {" "}
            <div className="post-icons">
              <i
                className="far fa-image"
                onClick={handleUploadClick} // Trigger file upload on icon click
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
              className="form-select  px-2 custom-select"
              aria-label="Default select example"
              style={{
                borderRadius: "100px",
                color: "white",
                backgroundImage: "none",
                appearance: "none",
                paddingTop: "0px",
                paddingBottom: "0px",
                backgroundColor:'#4fa6f2'
              }}
              onChange={handleSelectChange} // Call function to remove focus on change
            >
              <option value="public">&nbsp; Public</option>
              <option value="private">&nbsp;Private</option>
              <option value="only_me">Only Me</option>
            </select>
          </div>

          <div className="ms-auto  bd-highlight" >
        
            <button className="btn btn-outline-primary p-2 px-4 mx-3" type="submit" style={{borderRadius:'70px',fontWeight:'bold'}}>
              Post
            </button>
          </div>
        </div>

        {/* Replace with select dropdown */}
      </form>
    </div>
  </div>

  );
}

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
    <div className="post  ">
      <form action="">
        <div className="form-group-1 ">
          
          <input type="text" placeholder="What's happening?" />
        </div>

         <div className="d-flex bd-highlight mb-3" style={{marginLeft:'-5.5%'}}>
          <div className="pt-2 bd-highlight " >
            {" "}
            <div className="post-icons me-2 ">
              <i
              style={{color:'#1682e8'}}
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
              
              
              width:'110px',
                appearance: "none",
                paddingTop: "0px",
                paddingBottom: "0px",
                border:'solid 2px #1682e8',
                borderRadius:'30px',
                color:'#1682e8'
              }}
              onChange={handleSelectChange} // Call function to remove focus on change
            >
              <option value="public">&nbsp;   <i class="fas fa-user-friends"></i>Public</option>
              <option value="private">&nbsp;   <i class="fas fa-user-friends"></i>Private</option>
              <option value="only_me">  <i class="fas fa-user-friends"></i>Only Me</option>
            </select>
          </div>

          <div className="ms-auto  bd-highlight" >
        
            <button disabled className="btn btn-primary disable  px-4 py-2 mx-3 fs-7" type="submit" style={{borderRadius:'20px',fontWeight:'bold',fontSize:'16px',color:"#fffff"}}>
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

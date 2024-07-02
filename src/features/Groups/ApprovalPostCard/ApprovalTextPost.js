import React, { useState, useEffect } from "react";
import image from "./logo.jpg";
const ApprovalTextPost = () => {
  const [commentsHeight, setCommentsHeight] = useState("80vh"); // Default height for medium devices

  // Function to update the height based on window width
  const updateHeight = () => {
    if (window.innerWidth < 576) {
      setCommentsHeight("72vh"); // Small devices (sm) like mobile phones
    } else {
      setCommentsHeight("81vh"); // Medium devices (md) like tablets and desktops
    }
  };

  // Effect to update height when component mounts and on window resize
  useEffect(() => {
    updateHeight(); // Initial height update

    // Event listener for window resize
    window.addEventListener("resize", updateHeight);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []); // Empty dependency array ensures effect runs only on mount and unmount

  return (
    <div className="posts">
      <div className="user-pics">
        <img src={image} alt="user3" />
      </div>
      <div className="user-content-text-box">
        <div className="user-names-text" style={{ marginTop: '2px' }}>
          <div className="name-column">
            <h1 className="full-name-text m-0 p-0">Mohammad</h1>
            <p className="user-name-text m-0 p-0">@eric_alvareeric</p>
          </div>
          <p className="time-text ms-3" style={{ marginTop: '10px' }}>2hrs</p>
        </div>

        <div className="user-content">
          <p style={{ margin: '0px' }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci tenetur, laboriosam sed temporibus qui corporis sequi quos vel officia perferendis fuga odit facere ullam, expedita assumenda illum voluptas commodi. Impedit?
          </p>
        </div>

        <div className="content-actions pe-3 d-flex justify-content-end">
          <button className="btn btn-success me-2">Approve</button>
          <button className="btn btn-danger">Remove</button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalTextPost;

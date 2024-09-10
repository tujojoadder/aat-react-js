
import React, { useState, useEffect } from "react";
import image from "./logo.jpg";
import { formatPostDate } from "../../../utils/dateUtils";
import Removebtn from "./ApprovalButton/Removebtn";
import ApproveBtn from "./ApprovalButton/ApproveBtn";
const ApprovalTextPost = ({post}) => {
  const [commentsHeight, setCommentsHeight] = useState("80vh"); // Default height for medium devices

    /* Text */
    const [isExpanded, setIsExpanded] = useState(false);
    const fullText = post.text_post.post_text;
    const previewText = fullText.substring(0, 175);
  
    const toggleText = () => {
      setIsExpanded(!isExpanded);
    };
  
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
    <div className="posts ">
      <div className="user-pics">
        <img  src={`${post.author.profile_picture}`}
        alt="user3" />
      </div>
      <div className="user-content-text-box">
        <div className="user-names-text" style={{ marginTop: '2px' }}>
          <div className="name-column">
            <h1 className="full-name-text m-0 p-0">{post.author.user_fname} {post.author.user_lname}</h1>
            <p className="user-name-text m-0 p-0">@{post.author.identifier}</p>
          </div>
          <p className="time-text ms-3" style={{ marginTop: '10px' }}>
          {formatPostDate(post.created_at)}
          </p>
        </div>

        <div className="user-contents pe-3">
          <p style={{ margin: "0px" }}>
            {isExpanded ? fullText : previewText}
            {fullText.length > 175 && (
              <span
                onClick={toggleText}
                style={{ color: "blue", cursor: "pointer" }}
              >
                {isExpanded ? " See less" : "... See more"}
              </span>
            )}
          </p>
        </div>

        <div className="content-actions pe-3 d-flex justify-content-end">
        {/* buttons */}

       <ApproveBtn groupId={post.group_id} postId={post.post_id} />
        </div>
      </div>
    </div>
  );
};

export default ApprovalTextPost;

import React, { useState } from 'react';
import image from "./logo.jpg";
import { formatPostDate } from '../../../utils/dateUtils';
import ApproveBtn from './ApprovalButton/ApproveBtn';
import Removebtn from './ApprovalButton/Removebtn';

export default function ApprovalBothPost({ post }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle image load
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // Text post handling
  const fullText = post?.text_post?.post_text || "";
  const previewText = fullText.substring(0, 175);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="posts">
      <div className="user-pics">
        <img 
          src={post?.author?.profile_picture || image} 
          alt={post?.author?.user_fname || "user"} 
        />
      </div>
      <div className="user-content-box">
        <div className="user-names" style={{ marginTop: '2px' }}>
          <div className="name-column">
            <h1 className="full-name m-0 p-0">
              {post?.author?.user_fname} {post?.author?.user_lname}
            </h1>
            <p className="user-name m-0 p-0">@{post?.author?.identifier}</p>
          </div>
          <p className="time me-4" style={{ paddingTop: '18px' }}>
            {formatPostDate(post?.created_at)}
          </p>
        </div>

        <div className="user-contents pe-3" >
          {fullText && (
            <p style={{ marginBottom: '5px' }}>
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
          )}

          {post?.image_post?.post_url && (
            <>
              {!isImageLoaded && (
                <div className="image-skeleton">
                  <div
                    className="skeleton-box"
                    style={{
                      height: "300px",
                      width: "100%",
                      backgroundColor: "#e5e5e5",
                      borderRadius: "15px",
                    }}
                  ></div>
                </div>
              )}
              <img
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  maxHeight: "65vh",
                  display: isImageLoaded ? "block" : "none",
                  objectFit: "cover",
                }}
                src={post.image_post.post_url}
                alt="content"
                onLoad={handleImageLoad}
              />
            </>
          )}
        </div>
        <div className="content-actions pe-3 d-flex justify-content-end">
     
     {/* buttons */}
       <ApproveBtn groupId={post.group_id} postId={post.post_id} />
  


        </div>
      </div>
    </div>
  );
}

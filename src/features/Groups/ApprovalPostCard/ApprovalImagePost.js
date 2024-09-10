import React, { useState } from 'react'
import image from "./logo.jpg";
import { formatDate } from 'date-fns';
import { formatPostDate } from '../../../utils/dateUtils';
import Removebtn from './ApprovalButton/Removebtn';
import ApproveBtn from './ApprovalButton/ApproveBtn';
export default function ApprovalImagePost({post}) {

  const [isImageLoaded, setIsImageLoaded] = useState(false);
    /* handle image loaded or not  */
    const handleImageLoad = () => {
      setIsImageLoaded(true);
    };
    
  return (
<div className="posts ">
      <div className="user-pics">
        <img 
         src={`${post.author.profile_picture}`}
        alt="user1" />
      </div>
      <div className="user-content-box ">
        <div className="user-names" style={{ marginTop: "2px" }}>
          <div className="name-column">
            <h1 className="full-name m-0 p-0">
            {post.author.user_fname} {post.author.user_lname}
            </h1>
            <p className="user-name m-0 p-0">
               @{post.author.identifier}
              </p>
          </div>
          <p className="time me-4" style={{ marginTop: "18px" }}>
          {formatPostDate(post.created_at)}
          </p>
        </div>

        <div className="user-contents">
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
              <div
                className="bImageContainer"
                style={{ display: isImageLoaded ? "block" : "none" }}
              >
                <img
                  className="bImage"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    maxHeight: "500px",
                  }}
                  src={`${post.image_post.post_url}`}
                  alt="post-content"
                  onLoad={handleImageLoad}
                />
              </div>
            </div>
        <div className="content-actions pe-3 d-flex justify-content-end">
          {/* buttons */}
       <ApproveBtn groupId={post.group_id} postId={post.post_id} />
        </div>
      </div>
    </div>
  )
}

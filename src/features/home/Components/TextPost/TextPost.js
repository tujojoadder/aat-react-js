import React, { useState, useEffect } from "react";
import image from "./logo.jpg";

import TextComment from "../TextComment/TextComment";
import Comment from "../Comment/Comment/Comment";
import './TextPost.css';
import CommentedImage from "../../../CommentedMedia/CommentedImage/CommentedImage";
import CommentedText from "../../../CommentedMedia/CommentedText/CommentedText";

const TextPost = () => {

/* Text */
const [isExpanded, setIsExpanded] = useState(false);
const fullText =" এ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেরূপ নূহ ও তাঁর পরবর্তী নবীদের (নবীদের) প্রতি ওয়াহী প্রেরণ করেছিলাম।’’ (সূরাহ্ আন-নিসা ৪/১৬৩) ১.এ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যে";
const previewText = fullText.substring(0, 175);

const toggleText = () => {
  setIsExpanded(!isExpanded);
};








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
    
    <div className="posts ">
      <div className="user-pics">
        <img src={image} alt="user3" />
      </div>
      <div className="user-content-text-box">
        <div className="user-names-text" style={{ marginTop: '2px' }}>
          <div className="name-column">
            <h1 className="full-name-text m-0 p-0">Mohammad </h1>
            <p className="user-name-text m-0 p-0">@eric_alvareeric</p>
          </div>
          <p className="time-text ms-3" style={{ marginTop: '10px' }}>  2hrs</p>
        </div>

        <div className="user-content">
          <p style={{margin:'0px'}}>
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

        <div className="content-icons  pe-3">
          <i
            className="far fa-heart red "
            data-bs-toggle="modal"
            data-bs-target="#textModal"
          >
            {" "}
            109
          </i>

          <i className="fa-regular fa-thumbs-down ps-md-3 ms-1"> 536</i>

          <i className="far fa-comment blue  ps-md-3 ms-1"> 1.6k</i>
          <i class="fa-solid fa-chevron-up ps-md-3 me-2"></i>
        </div>
      </div>

      {/* Modal */}
      <div
        style={{ overflowY: "hidden" }}
        className="modal fade "
        id="textModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content ">
            <div className="modal-header shadow-sm p-3 bg-body rounded">
              <h5 className="modal-title fs-5" id="exampleModalLabel">
              tt  Comment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <div
                className="comments pb-4 px-md-4"
                style={{ height: commentsHeight, overflowY: "scroll",overflowX:'hidden' }}
              >

                <CommentedText/>
                <TextComment />
                <TextComment />
                <TextComment />
                <TextComment />
                <TextComment />
                <TextComment />
              </div>
              <div className="my-comment">
                <Comment/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextPost;

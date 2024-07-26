
import React, { useState, useEffect } from "react";
import image from "./logo.jpg";
const CommentedText = () => {
 /* Text */
const [isExpanded, setIsExpanded] = useState(false);
const fullText =" এ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেরূপ নূহ ও তাঁর পরবর্তী নবীদের (নবীদের) প্রতি ওয়াহী প্রেরণ করেছিলাম।’’ (সূরাহ্ আন-নিসা ৪/১৬৩) ১.এ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যে";
const previewText = fullText.substring(0, 175);

const toggleText = () => {
  setIsExpanded(!isExpanded);
};

  return (
    
    <div className="posts" style={{borderBottom:'3px solid blue'}}>
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
          )}           </p>
        </div>

        <div className="content-icons  pe-3">
          <i
            className="far fa-heart red "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {" "}
            109
          </i>

          <i className="fa-regular fa-thumbs-down ps-md-3 ms-1"> 536</i>

          <i className="far fa-comment blue  ps-md-3 ms-1"> 1.6k</i>
          <i className="fa-solid fa-chevron-up ps-md-3 me-2"></i>
        </div>
      </div>

     
    </div>
  );
};

export default CommentedText;


import React, { useEffect, useState } from 'react'
import image from "./logo.jpg";

export default function CommentedBothPosts() {

  /* Text */
const [isExpanded, setIsExpanded] = useState(false);
const fullText =" এ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেরূপ নূহ ও তাঁর পরবর্তী নবীদের (নবীদের) প্রতি ওয়াহী প্রেরণ করেছিলাম।’’ (সূরাহ্ আন-নিসা ৪/১৬৩) ১.এ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যে";
const previewText = fullText.substring(0, 175);

const toggleText = () => {
  setIsExpanded(!isExpanded);
};
  return (
    <div class="posts "  style={{borderBottom:'3px solid blue'}}>
      <div class="user-pics">
        <img src={image} alt="user1" />
      </div>
      <div class="user-content-box">
        <div className="user-names" style={{ marginTop: '2px' }}>
          <div className="name-column">
            <h1 className="full-name m-0 p-0">Turjo Joadder </h1>
         <p className="user-name m-0 p-0">@eric_alvareeric</p>
          </div>
          <p className="time me-4" style={{ paddingTop: '18px' }}>  2hrs</p>
        </div>

        <div class="user-content" style={{marginTop:'-10px'}}>
          <p style={{marginBottom:'5px'}}>
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
          <img
            style={{ Width: "100%", maxHeight: "65vh" }}
            src={image}
            alt="content1"
          />
        </div>
        <div className="content-icons px-2 ">
          <i
            className="far fa-heart red "
            data-bs-toggle="modal"
            data-bs-target="#BothPostModal"
          >
            {" "}
            109
          </i>

          <i className="fa-regular fa-thumbs-down ps-md-3"> 536</i>

          <i className="far fa-comment blue  ps-md-3"> 1.6k</i>
        
          <i class="fa-solid fa-chevron-up ps-md-3 pe-4"></i>
        </div>
      </div>
       
    </div>
  )
}

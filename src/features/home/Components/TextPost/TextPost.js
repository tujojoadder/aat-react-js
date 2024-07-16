import React, { useState, useEffect, useRef } from "react";
import image from "./logo.jpg";
import TextComment from "../TextComment/TextComment";
import Comment from "../Comment/Comment/Comment";
import "./TextPost.css";
import CommentedText from "../../../CommentedMedia/CommentedText/CommentedText";
import SendMessage from "../../../Messages/SendMessages/SendMessage";

const TextPost = () => {
  /* comment width */
  const [isSmall, setIsSmall] = useState(window.innerWidth <= 650);
  const [isMid, setIsMid] = useState(
    window.innerWidth > 650 && window.innerWidth <= 1200
  );
  const [isLg, setIsLg] = useState(
    window.innerWidth > 1200 && window.innerWidth <= 1450
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);

  const updateWidth = () => {
    setIsSmall(window.innerWidth <= 650);
    setIsMid(window.innerWidth > 650 && window.innerWidth <= 1200);
    setIsLg(window.innerWidth > 1200 && window.innerWidth <= 1450);
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener("shown.bs.modal", handleModalShow);
      modalElement.addEventListener("hidden.bs.modal", handleModalHide);
      return () => {
        modalElement.removeEventListener("shown.bs.modal", handleModalShow);
        modalElement.removeEventListener("hidden.bs.modal", handleModalHide);
      };
    }
  }, []);

  const handleModalShow = () => {
    setIsModalOpen(true);
  };

  const handleModalHide = () => {
    setIsModalOpen(false);
  };


/* Text */
  const [isExpanded, setIsExpanded] = useState(false);
  const fullText = "এ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেরূপ নূহ ও তাঁর পরবর্তী নবীদের (নবীদের) প্রতি ওয়াহী প্রেরণ করেছিলাম।’’ (সূরাহ্ আন-নিসা ৪/১৬৩) ১.এ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যেএ মর্মে আল্লাহ্ তা’আলার বাণীঃ ’’নিশ্চয় আমি আপনার প্রতি সেরূপ ওয়াহী প্রেরণ করেছি যে "; // Shortened for brevity
  const previewText = fullText.substring(0, 175);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="posts">
      <div className="user-pics">
        <img src={image} alt="user3" />
      </div>
      <div className="user-content-text-box">
        <div className="user-names-text pb-1" style={{ marginTop: "2px" }}>
          <div className="name-column">
            <h1 className="full-name-text m-0 p-0">Mohammad </h1>
            <p className="user-name-text m-0 p-0">@eric_alvareeric</p>
          </div>
          <p className="time-text ms-3" style={{ marginTop: "10px" }}>
            2hrs
          </p>
        </div>

        <div className="user-content">
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

        <div className="content-icons pe-3">
          <i
            className="far fa-heart red"
            data-bs-toggle="modal"
            data-bs-target="#textModal"
          >
            {" "}
            109
          </i>
          <i className="fa-regular fa-thumbs-down ps-md-3 ms-1"> 536</i>
          <i className="far fa-comment blue ps-md-3 ms-1"> 1.6k</i>
          <i className="fa-solid fa-chevron-up ps-md-3 me-2"></i>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="textModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header shadow-sm p-3 bg-body rounded">
              <h5 className="modal-title fs-5" id="exampleModalLabel">
                Comment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {isModalOpen && (
                <>
                  <div
                    className="comments px-md-4 "
                    style={{
                      height: "100vh",
                      overflowY: "scroll",
                      overflowX: "hidden",
                    }}
                  >
                    <CommentedText />
                    <TextComment />
                    <TextComment />
                    <TextComment />
                    <TextComment />
                    <TextComment />
                    <TextComment />
                    {/* Needed */}
                    <div style={{ paddingBottom: "20vh" }}></div>
                  </div>
                  {/* Footer */}
                  <div
                    className="card-footer p-0 m-0"
                    style={{
                      position: "fixed",
                      bottom: "0px",
                      width: isSmall
                        ? "100%"
                        : isMid
                        ? "69.8%"
                        : isLg
                        ? "69.9%"
                        : "44.9%",
                    }}
                  >
                    <Comment />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextPost;

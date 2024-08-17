import React, { useState, useEffect, useRef } from "react";
import image from "./logo.jpg";
import TextComment from "../TextComment/TextComment";
import Comment from "../Comment/Comment/Comment";
import "./TextPost.css";
import CommentedText from "../../../CommentedMedia/CommentedText/CommentedText";
import SendMessage from "../../../Messages/SendMessages/SendMessage";
import { formatPostDate } from "../../../../utils/dateUtils";

const TextPost = ({ post }) => {
  const [isXSmall, setIsXSmall] = useState(window.innerWidth <= 650);
  const [isSmall, setIsSmall] = useState(window.innerWidth > 650 && window.innerWidth <= 950);
  const [isMid, setIsMid] = useState(window.innerWidth > 950 && window.innerWidth <= 1200);
  const [isLg, setIsLg] = useState(window.innerWidth > 1200);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);

  const updateWidth = () => {
    setIsXSmall(window.innerWidth <= 650);
    setIsSmall(window.innerWidth > 650 && window.innerWidth <= 950);
    setIsMid(window.innerWidth > 950 && window.innerWidth <= 1200);
    setIsLg(window.innerWidth > 1200);
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
  const fullText = post.text_post.post_text;
  const previewText = fullText.substring(0, 175);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="posts mx-2">
      <div className="user-pics">
        <img src={`http://127.0.0.1:8000/${post.author.profile_picture}`} alt="user3" />
      </div>
      <div className="user-contents-text-box">
        <div className="user-names-text pb-1" style={{ marginTop: "2px" }}>
          <div className="name-column ">
            <h1 className="full-name-text m-0 p-0">{post.author.user_fname} {post.author.user_lname}</h1>
            <p className="user-name-text m-0 p-0">@{post.author.identifier}</p>
          </div>
          <p className="time-text ms-3 " style={{ marginTop: "10px", maxWidth: '150px' }}>
            {formatPostDate(post.created_at)}
          </p>
        </div>

        <div className="user-contents">
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
            {" "} 109
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
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {post.author.user_fname} {post.author.user_lname}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <TextComment post={post} />
              <CommentedText />
              <SendMessage />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextPost;

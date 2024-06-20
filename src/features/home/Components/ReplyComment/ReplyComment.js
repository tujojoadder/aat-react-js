import React, { useState } from "react";
import image from "./logo.jpg";
import "./ReplyComment.css";

export default function TextComment() {
  // State to manage the visibility of the reply input box
  const [showReplyInput, setShowReplyInput] = useState(false);
  // State to manage the input text
  const [replyText, setReplyText] = useState("");

  // Function to handle the click event for the "Reply" text
  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  // Function to handle input text change
  const handleInputChange = (event) => {
    setReplyText(event.target.value);
  };

  return (
    <div className="">
      <div class="d-flex bd-highlight ">
        <div class="bd-highlight me-1">
          <img
            style={{ height: "45px", width: "45px", borderRadius: "50%" }}
            src={image}
            alt="user3"
          />
        </div>
        <div class=" bd-highlight">
          {" "}
          <div className="name-column">
            <h1 className="full-name-text m-0 p-0">Mohammad</h1>
            <p className="user-name-text m-0 p-0">@eric_alvareeric</p>
          </div>
        </div>
        <div class="ms-auto bd-highlight">
          <p className="time-text">2hrs</p>
        </div>
      </div>

      <div className="user-content-text ms-2">
        <p style={{ margin: "0px" }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          tenetur, laboriosam sed temporibus qui corporis sequi quos vel officia
          perferendis fuga odit facere ullam, expedita assumenda illum voluptas
          commodi. Impedit?
        </p>
      </div>

      <div className="content-icons-text pt-1 pb-2 pe-3 ps-2 d-flex align-items-center" style={{ padding: "0px" }}>
        <i
          className="far fa-heart red"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          109
        </i>

        <i className="fa-regular fa-thumbs-down ps-md-3 ms-1"> 536</i>

        <span
          className="ms-3"
          style={{ cursor: "pointer" }}
          onClick={handleReplyClick}
        >
          Reply
        </span>
      </div>

      {showReplyInput && (
        <div className="reply-input-box  me-3 mb-3 d-flex align-items-center">
          <input
            type="text"
            placeholder="Write a reply... "
            className="form-control reply-input"
            value={replyText}
            onChange={handleInputChange}
          />
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            style={{ borderRadius: "20px", padding: "7px 13px" }}
            disabled={!replyText.trim()}
          >
            <span>Send</span>
          </button>
        </div>
      )}
    </div>
  );
}

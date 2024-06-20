import React, { useState } from "react";
import image from "./logo.jpg";
import "./TextComment.css";
import ReplyComment from "../ReplyComment/ReplyComment";

export default function TextComment() {
  // State to manage the visibility of the reply input box
  const [showReplyInput, setShowReplyInput] = useState(false);
  // State to manage the input text
  const [replyText, setReplyText] = useState("");
  // State to manage reply comments
  const [replyComments, setReplyComments] = useState([]);

  // Function to handle the click event for the "Reply" text
  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  // Function to handle input text change
  const handleInputChange = (event) => {
    setReplyText(event.target.value);
  };

  // Function to handle "View Reply" button click
  const handleViewRepliesClick = () => {
    // Add three sample reply comments for demonstration
    setReplyComments([
      { id: 1, text: "First reply comment" },
      { id: 2, text: "Second reply comment" },
      { id: 3, text: "Third reply comment" },
    ]);
  };

  return (
    <div className="posts">
      <div className="user-pics">
        <img src={image} alt="user3" />
      </div>
      <div className="user-content-text-box">
        <div className="user-names-text" style={{ marginTop: "4px" }}>
          <div className="name-column">
            <h1 className="full-name-text m-0 p-0">Mohammad</h1>
            <p className="user-name-text m-0 p-0">@eric_alvareeric</p>
          </div>
          <p className="time-text ms-3" style={{ marginTop: "7px" }}>
            2hrs
          </p>
        </div>

        <div className="user-content-text">
          <p style={{ margin: "0px" }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            tenetur, laboriosam sed temporibus qui corporis sequi quos vel
            officia perferendis fuga odit facere ullam, expedita assumenda illum
            voluptas commodi. Impedit?
          </p>
        </div>

        <div
          className="content-icons-text py-2 pe-3 d-flex align-items-center"
          style={{ padding: "0px" }}
        >
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
            style={{ cursor: "pointer", color: "rgb(101, 119, 134)" }}
            onClick={handleReplyClick}
          >
            Reply
          </span>
        </div>
        {showReplyInput && (
          <div className="reply-input-box me-md-3 mb-3 mt-1 me-sm-1 d-flex align-items-center">
            <input
              type="text"
              placeholder="Write a reply..."
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
        {/* Render reply comments */}
        {replyComments.map((reply) => (
          <ReplyComment key={reply.id} text={reply.text} />
        ))}
        <div className="view-replay " style={{ marginTop:'-8px' }}>
          <span
            type="button"
            style={{
              borderRadius: "30px",
              backgroundColor: "#e5e5e5",
              color: "rgb(101, 119, 134)",
              cursor: "pointer",
              padding: "5px 15px",
            }}
            className="btn p-1 px-2"
            onClick={handleViewRepliesClick}
          >
            View Replies
          </span>
        </div>
        

        
      </div>
    </div>
  );
}

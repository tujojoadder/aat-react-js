import React, { useState } from "react";
import image from "./logo.jpg";
import "./ReplyComment.css";
import { formatPostDate } from "../../../../utils/dateUtils";
import { useDispatch, useSelector } from "react-redux";
import { setReplyLoveReaction, setReplyUnlikeReactions } from "../../HomeSlice";
import { useToggleLoveMutation } from "../../../../services/loveApi";
import { useToggleUnlikeMutation } from "../../../../services/unlikeApi";
import { useCreateReplyRepliesMutation } from "../../../../services/repliesApi";

export default function ReplyComment({ comment }) {
  const dispatch = useDispatch();
  const [replyComments, setReplyComments] = useState([]);
  const [createReply, { isLoading: isSubmitting }] =
    useCreateReplyRepliesMutation();
  const [toggleLove] = useToggleLoveMutation();
  const [toggleUnlike] = useToggleUnlikeMutation();
  const replyLoveReactions = useSelector(
    (state) => state.home.replyLoveReactions[comment?.reply_id]
  );
  const replyUnlikeReactions = useSelector(
    (state) => state.home.replyUnlikeReactions[comment?.reply_id]
  );
  

  /* Text */
  const [isExpanded, setIsExpanded] = useState(false);
  const fullText = comment.reply_text;
  const previewText = fullText.substring(0, 175);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

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

  const handleLoveClick = async () => {
    // Optimistic update

    if (replyLoveReactions) {
      dispatch(
        setReplyLoveReaction({ replyID: comment.reply_id, isActive: false })
      );
    } else {
      dispatch(
        setReplyLoveReaction({ replyID: comment.reply_id, isActive: true })
      ); // Activate love reaction
    }

    try {
      await toggleLove({ loveOnType: "reply", loveOnId: comment.reply_id });
    } catch (error) {
      console.error("Failed to toggle love:", error);
    }
  };

  const handleUnlikeClick = async () => {
    if (replyUnlikeReactions) {
      dispatch(
        setReplyUnlikeReactions({ replyID: comment?.reply_id, isActive: false })
      );
    } else {
      dispatch(
        setReplyUnlikeReactions({ replyID: comment?.reply_id, isActive: true })
      );
    }

    try {
      await toggleUnlike({
        unlikeOnType: "reply",
        unlikeOnId: comment?.reply_id,
      });
    } catch (error) {
      console.error("Failed to toggle unlike:", error);
    }
  };

  // Submit reply function
  const handleReplySubmit = async () => {
    if (replyText.trim()) {
      try {
        const res = await createReply({
          commentId: comment?.comment_id,
          parent_reply_id: comment?.reply_id,
          reply_text: replyText,
        });

        if (res?.data?.message) {
          // Optionally add the new reply to the local state
          setReplyComments((prev) => [
            ...prev,
            { id: res?.id, text: replyText },
          ]);
         
          // Clear the input box after submission
          setReplyText("");
          setShowReplyInput(false);
        }
      } catch (error) {
        console.error("Failed to submit reply:", error);
      }
    }
  };

  return (
    <div className="mt-2">
      <div className="d-flex bd-highlight ">
        <div className="bd-highlight me-1">
          <img
            style={{ height: "45px", width: "45px", borderRadius: "50%" }}
            src={comment.replied_by.profile_picture}
            alt="user3"
          />
        </div>
        <div className=" bd-highlight">
          {" "}
          <div className="name-column">
            <h1 className="full-name-text m-0 p-0">
              {comment.replied_by.user_fname} {comment.replied_by.user_lname}
            </h1>
            <p className="user-name-text m-0 p-0">
              @{comment.replied_by.identifier}
            </p>
          </div>
        </div>
        <div className="ms-auto bd-highlight">
          <p className="time-text">
            {comment?.created_at && formatPostDate(comment.created_at)}
          </p>
        </div>
      </div>

      <div className="user-content-text ms-2">
        <p style={{ margin: "0px" }} className="mt-2">
          {isExpanded ? fullText : previewText}
          {fullText.length > 175 && (
            <span
              onClick={toggleText}
              style={{ color: "blue", cursor: "pointer" }}
            >
              {isExpanded ? " See less" : "... See more"}
            </span>
          )}{" "}
        </p>
      </div>

      <div
        className="content-icons-text pt-1 pb-2 pe-3 ps-2 d-flex align-items-center"
        style={{ padding: "0px" }}
      >
        <i
          className={`far fa-heart ${
            replyLoveReactions ? "fas red-heart" : ""
          }`}
          onClick={handleLoveClick}
        >
          {comment?.totalLove > 0 && (
            <span className="ps-1">{comment?.totalLove}</span>
          )}
        </i>
        <i
          className={`far fa-thumbs-down ${
            replyUnlikeReactions ? "fas black-unlike" : ""
          }`}
          onClick={handleUnlikeClick}
        >
          {comment?.totalUnlike > 0 && (
            <span className="ps-1">{comment?.totalUnlike}</span>
          )}
        </i>
        <span
          className="ms-3"
          style={{ cursor: "pointer" }}
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
            disabled={isSubmitting} // Disable input while submitting
            style={{
              border: "1px solid #ccc",
              borderRadius: "20px",
              padding: "10px 15px",
              height: "auto",
              boxSizing: "border-box",
              outline: "none",
              fontSize: "16px",
              backgroundColor: "#fff",
              boxShadow: "none",
              flexGrow: 1,
            }}
          />
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            onClick={handleReplySubmit}
            disabled={!replyText.trim() || isSubmitting} // Disable button while submitting or if no text
            style={{
              borderRadius: "20px",
              padding: "7px 13px",
              backgroundColor:
                isSubmitting || !replyText.trim() ? "#ccc" : "#007bff",
              border: "none",
              color: "#fff",
              cursor:
                isSubmitting || !replyText.trim() ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            {isSubmitting ? <span>Sending...</span> : <span>Send</span>}
          </button>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import image from "./logo.jpg";
import "./TextComment.css";
import ReplyComment from "../ReplyComment/ReplyComment";
import { formatPostDate } from "../../../../utils/dateUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  setCommentId,
  setCommentsLoveReaction,
  setCommentsUnlikeReactions,
} from "../../HomeSlice";
import { useToggleLoveMutation } from "../../../../services/loveApi";
import { useToggleUnlikeMutation } from "../../../../services/unlikeApi";
import { useCreateCommentReplyMutation } from "../../../../services/repliesApi";
import AllReply from "../ReplyComment/AllReply/AllReply";

export default function TextComment({ comment, type,showReplies }) {
 // Select each state property separately
const profile_picture = useSelector((state) => state.home.profile_picture);
const user_fname = useSelector((state) => state.home.user_fname);
const user_lname = useSelector((state) => state.home.user_lname);
const identifier = useSelector((state) => state.home.identifier);

  const [toggleLove] = useToggleLoveMutation();
  const [toggleUnlike] = useToggleUnlikeMutation();
  const [createReply, { isLoading: isSubmitting }] =
    useCreateCommentReplyMutation();
  const dispatch = useDispatch();

  const commentLoveReactions = useSelector(
    (state) => state.home.commentLoveReactions[comment?.comment_id]
  );
  const commentUnlikeReactions = useSelector(
    (state) => state.home.commentUnlikeReactions[comment?.comment_id]
  );

  useEffect(() => {
    if (comment?.isLove) {
      dispatch(
        setCommentsLoveReaction({
          commentID: comment?.comment_id,
          isActive: true,
        })
      );
    }
    if (comment?.isUnlike) {
      dispatch(
        setCommentsUnlikeReactions({
          commentID: comment?.comment_id,
          isActive: true,
        })
      );
    }
  }, [dispatch, comment]);

  const handleLoveClick = async () => {
    if (commentLoveReactions) {
      dispatch(
        setCommentsLoveReaction({
          commentID: comment?.comment_id,
          isActive: false,
        })
      );
    } else {
      dispatch(
        setCommentsLoveReaction({
          commentID: comment?.comment_id,
          isActive: true,
        })
      );
    }

    try {
      await toggleLove({
        loveOnType: "comment",
        loveOnId: comment?.comment_id,
      });
    } catch (error) {
      console.error("Failed to toggle love:", error);
    }
  };

  const handleUnlikeClick = async () => {
    if (commentUnlikeReactions) {
      dispatch(
        setCommentsUnlikeReactions({
          commentID: comment?.comment_id,
          isActive: false,
        })
      );
    } else {
      dispatch(
        setCommentsUnlikeReactions({
          commentID: comment?.comment_id,
          isActive: true,
        })
      );
    }

    try {
      await toggleUnlike({
        unlikeOnType: "comment",
        unlikeOnId: comment?.comment_id,
      });
    } catch (error) {
      console.error("Failed to toggle unlike:", error);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const fullText = comment?.comment_text || "";
  const previewText =
    fullText.length > 175 ? fullText.substring(0, 175) : fullText;

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyComments, setReplyComments] = useState([]);
  const [showAllReplies, setShowAllReplies] = useState(false); // State for showing all replies

  // Submit reply function
  const handleReplySubmit = async () => {
    if (replyText.trim()) {
      try {
        const res = await createReply({
          commentId: comment?.comment_id,
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

  const handleReplyClick = () => {
    dispatch(setCommentId(comment.comment_id));
    showReplies();
   /*  setShowReplyInput(!showReplyInput); */

  };

  const handleInputChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleViewRepliesClick = () => {
    setShowAllReplies(!showAllReplies); // Toggle showing all replies
  };

  return (
    <div className="posts">
      {type === "user" ? (
        <div className="user-pics">
         
          
         <img
               style={{backgroundColor:'lightgray'}}
                src={`${profile_picture}`}
                alt={"Profile Image"}
                
              />
        
        </div>
      ) : (
        <div className="user-pics">
          {!comment?.commenter?.profile_picture && (
            <div className="profile-pic-skeleton">
              <div
                className="skeleton-box ms-2 me-1"
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#e5e5e5",
                }}
              ></div>
            </div>
          )}

          <img src={profile_picture} alt="user-profile" />
        </div>
      )}

      <div className="user-content-text-box">
        <div className="user-names-text" style={{ marginTop: "4px" }}>
          <div className="name-column">
            <h1 className="full-name-text m-0 p-0">
              <h1 className="full-name-text m-0 p-0">
                {type === "user"
                  ? `${user_fname} ${user_lname}`
                  : `${comment?.commenter?.user_fname} ${comment?.commenter?.user_lname}`}
              </h1>
            </h1>
            <p className="user-name-text m-0 p-0">
             
              {type === "user"
                  ? `@${identifier}`
                  : `@${comment?.commenter?.identifier}`}
            </p>
          </div>
          <p className="time-text ms-3" style={{ marginTop: "7px" }}>
          {type === "user"
    ? `now`
    : comment?.created_at && formatPostDate(comment.created_at)}




          </p>
        </div>

        <div className="user-content-text">
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

        <div
          className="content-icons-text py-2 pe-3 d-flex align-items-center"
          style={{ padding: "0px" }}
        >
          <i
            className={`far fa-heart ${
              commentLoveReactions ? "fas red-heart" : ""
            }`}
            onClick={handleLoveClick}
          >
            {comment?.totalLove > 0 && (
              <span className="ps-1">{comment?.totalLove}</span>
            )}
          </i>
          <i
            className={`far fa-thumbs-down ${
              commentUnlikeReactions ? "fas black-unlike" : ""
            }`}
            onClick={handleUnlikeClick}
          >
            {comment?.totalUnlike > 0 && (
              <span className="ps-1">{comment?.totalUnlike}</span>
            )}
          </i>

          <span
            className="ms-3"
            style={{ cursor: "pointer", color: "rgb(101, 119, 134)" }}
            onClick={handleReplyClick}
          >
            Reply

            {comment?.reply_count > 0 && (
              <span> ({comment?.reply_count})</span>
            )}
          </span>
        </div>

        {/* Reply input and button section */}
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

        {/* Render reply comments */}
        {showAllReplies && <AllReply commentId={comment.comment_id} />}

        <div className="view-replay-section">
          <button
            className="view-replies-button"
            onClick={handleViewRepliesClick}
            style={{
              background: "none",
              border: "none",
              color: "blue",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            {comment?.replies_count > 0 && (
              <span>View all replies ({comment?.replies_count})</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
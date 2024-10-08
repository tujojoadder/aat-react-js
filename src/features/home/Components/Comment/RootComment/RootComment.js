import React, { useState } from "react";
import AllComments from "../AllComments/AllComments";
import AllReply from "../../ReplyComment/AllReply/AllReply";
import { useSelector } from "react-redux";

export default function RootComment({ thePostId }) {
  const [show, setShow] = useState("comment");
  const commentId = useSelector((state) => state.home.commentId);
  // Function to show comments
  const showComments = () => {
    setShow("comment");
  };

  // Function to show replies
  const showReplies = () => {
    setShow("reply");
  };

  return (
    <>
      {commentId}
      {/* Conditional rendering based on the show state */}
      {show === "comment" && (
        <AllComments postId={thePostId} showReplies={showReplies} />
      )}
      {show === "reply" && <AllReply showComments={showComments} />}
    </>
  );
}

import React, { useEffect, useState } from "react";
import AllComments from "../AllComments/AllComments";
import AllReply from "../../ReplyComment/AllReply/AllReply";
import { useSelector } from "react-redux";
import Comment from "../Comment/Comment";
import Reply from "../../ReplyComment/Reply/Reply";

export default function RootComment({ thePostId }) {
  const commentId = useSelector((state) => state.home.commentId);
  const [isXSmall, setIsXSmall] = useState(window.innerWidth <= 650);
  const [isSmall, setIsSmall] = useState(
    window.innerWidth > 650 && window.innerWidth <= 950
  );
  const [isMid, setIsMid] = useState(
    window.innerWidth > 950 && window.innerWidth <= 1200
  );
  const [isLg, setIsLg] = useState(window.innerWidth > 1200);
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

  const [show, setShow] = useState("comment");

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
      <div className=" px-md-4">
        {/* Conditional rendering based on the show state */}
        {show === "comment" && (
          <AllComments postId={thePostId} showReplies={showReplies} />
        )}
        {show === "reply" && <AllReply showComments={showComments} />}
      </div>

      <div
        className="card-footer p-0 m-0"
        style={{
          position: "fixed",
          bottom: "0",
          width: isXSmall
            ? "100%"
            : isSmall
            ? "74.8%"
            : isMid
            ? "59.8%"
            : isLg
            ? "49.9%"
            : "49.9%",
        }}
      >
        {/* Conditional rendering based on the show state */}
        {show === "comment" && <Comment postId={thePostId} />}
        {show === "reply" && <Reply />}
      </div>
    </>
  );
}

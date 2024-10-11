import React, { useEffect, useState } from "react";
import ReplyComment from "../ReplyComment";
import CommentSpinner from "../../Comment/CommentSpinner/CommentSpinner";
import { useGetRepliesByCommentIdQuery } from "../../../../../services/repliesApi";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import SmallScreenCommnetBack from "../../Comment/CommentsButton/SmallScreenCommnetBack";
import MidScreenCommentback from "../../Comment/CommentsButton/MidScreenCommentback";
import LargeScreenCommentBack from "../../Comment/CommentsButton/LargeScreenCommentBack";
import echo from "../../../../../echo";

export default function AllReply({ showComments }) {
  const authId = useSelector((state) => state.home.user_id);
  const commentId = useSelector((state) => state.home.commentId);
  const [friendRequestPage, setFriendRequestPage] = useState(1); // Current page state
  const [allFriendRequest, setAllFriendRequest] = useState([]); // All replies state
  const [broadcastedReply, setBroadcastedReply] = useState([]); // Real-time comments
  const [hasMoreFriendRequest, setHasMoreFriendRequest] = useState(true); // Infinite scroll control

  const { ref: replyRequestRef, inView: inViewReplyRequests } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Fetching reply data based on the current page
  const {
    data: repliesData,
    isSuccess: isRepliesSuccess,
    isLoading: isRepliesLoading,
    isFetching: isRepliesFetching,
    refetch,
  } = useGetRepliesByCommentIdQuery({ commentId, page: friendRequestPage });

  // When the replies data is fetched successfully
  useEffect(() => {
    if (isRepliesSuccess && repliesData?.data) {
      if (repliesData.data.length < 3) {
        setHasMoreFriendRequest(false); // No more replies to fetch
      }
      const newRequests = repliesData.data.filter(
        (newRequest) =>
          !allFriendRequest.some(
            (request) => request.reply_id === newRequest.reply_id
          )
      );
      if (newRequests.length > 0) {
        setAllFriendRequest((prevRequests) => [
          ...prevRequests,
          ...newRequests,
        ]);
      }
    }
  }, [isRepliesSuccess, repliesData]);

  // Infinite scroll trigger: Load more replies when inView is true
  useEffect(() => {
    if (inViewReplyRequests && hasMoreFriendRequest && !isRepliesFetching) {
      setFriendRequestPage((prevPage) => prevPage + 1); // Increment page
    }
  }, [inViewReplyRequests, hasMoreFriendRequest, isRepliesFetching]);

  // Handle real-time broadcasted comments
  useEffect(() => {
    const channel = echo.private("broadcast-reply");
    channel.listen(".getReply", (e) => {
      console.log(e);
      if (e.reply.replied_by_id === authId) {
        setBroadcastedReply((prevComments) => [e.reply, ...prevComments]);
      }
    });

    return () => {
      echo.leave("broadcast-comment");
    };
  }, [authId]);

  // Refetch when the component is first rendered (when switching to 'reply')
  useEffect(() => {
    refetch(); // Initial fetch
  }, [refetch]);

  return (
    <>
      {/* Header Section with Back Button and Replies Title */}
      <SmallScreenCommnetBack showComments={showComments} />
      <MidScreenCommentback showComments={showComments} />
      <LargeScreenCommentBack showComments={showComments} />

<div className="pb-5">
      {/* Show initial spinner only for first page */}
      {isRepliesLoading && friendRequestPage === 1 && (
        <div className="text-center mt-2">
          <CommentSpinner size="25px" color="#ff69b3" />
        </div>
      )}

      {/* Render broadcasted comments (real-time updates) */}

      {broadcastedReply.length > 0 &&
        broadcastedReply.map((reply) => (
          <ReplyComment comment={reply} key={reply.reply_id} type="user" />
        ))}

      {/* List of replies */}
      {allFriendRequest.length > 0 &&
        allFriendRequest.map((comment) => (
          <ReplyComment key={comment.reply_id} comment={comment} />
        ))}

      {/* Infinite scroll spinner: Only for subsequent pages */}
      {friendRequestPage > 1 && isRepliesFetching && (
        <div
          ref={replyRequestRef}
          className="infinite-scroll-trigger"
        
        ></div>
      )}

      {/* Infinite scroll trigger element */}
      {!isRepliesFetching && hasMoreFriendRequest && (
        <div
          ref={replyRequestRef}
          className="infinite-scroll-trigger"
          
        />
      )}

</div>






    </>
  );
}

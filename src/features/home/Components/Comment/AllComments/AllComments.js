import React, { useEffect, useState } from "react";
import TextComment from "../../TextComment/TextComment";
import { useGetCommentsByPostIdQuery } from "../../../../../services/commentApi";
import { useInView } from "react-intersection-observer";
import CommentSpinner from "../CommentSpinner/CommentSpinner";
import { useSelector } from "react-redux";
import echo from "../../../../../echo";

export default function AllComments({ postId,showReplies }) {
  const authId = useSelector((state) => state.home.user_id);
  const { ref: requestRef, inView: inViewRequests } = useInView({
    threshold: 0,
    triggerOnce: false,
  });
  const shouldRefetch = useSelector((state) => state.home.shouldRefetch); // Listen to refetch trigger
  const [friendRequestPage, setFriendRequestPage] = useState(1);
  const [allFriendRequest, setAllFriendRequest] = useState([]);
  const [hasMoreFriendRequest, setHasMoreFriendRequest] = useState(true);

  const [broadcastedComments, setBroadcastedComments] = useState([]); // State for accumulating broadcasted comments

  /* Fetching Request data */
  const {
    data: useGetAuthUserfriendRequestQueryData,
    isSuccess: useGetAuthUserfriendRequestQuerySuccess,
    isLoading: useGetAuthUserfriendRequestQueryLoading,
    isError: useGetAuthUserfriendRequestQueryError,
    isFetching: useGetAuthUserfriendRequestQueryFetching,
    refetch,
  } = useGetCommentsByPostIdQuery({ postId, page: friendRequestPage });

  useEffect(() => {
    if (
      useGetAuthUserfriendRequestQuerySuccess &&
      useGetAuthUserfriendRequestQueryData?.data
    ) {
      // Check if there are new comments and update the state
      if (useGetAuthUserfriendRequestQueryData.data.length < 3) {
        setHasMoreFriendRequest(false);
      }

      const newRequests = useGetAuthUserfriendRequestQueryData.data.filter(
        (newRequest) =>
          !allFriendRequest.some(
            (request) => request.comment_id === newRequest.comment_id
          )
      );

      if (newRequests.length > 0) {
        setAllFriendRequest((prevRequests) => [
          ...prevRequests,
          ...newRequests,
        ]);
      }
    }
  }, [
    useGetAuthUserfriendRequestQuerySuccess,
    useGetAuthUserfriendRequestQueryData,
  ]);

  useEffect(() => {
    if (
      inViewRequests &&
      !useGetAuthUserfriendRequestQueryFetching &&
      !useGetAuthUserfriendRequestQueryError &&
      hasMoreFriendRequest &&
      useGetAuthUserfriendRequestQuerySuccess
    ) {
      setFriendRequestPage((prevPage) => prevPage + 1);
    }
  }, [
    inViewRequests,
    useGetAuthUserfriendRequestQueryFetching,
    useGetAuthUserfriendRequestQueryError,
    hasMoreFriendRequest,
    useGetAuthUserfriendRequestQuerySuccess,
  ]);

  // Listen for broadcasted comments
  useEffect(() => {
    echo.private("broadcast-comment").listen(".getComment", (e) => {
      if (e.comment.commenter_id === authId) {
        setBroadcastedComments((prevComments) => [e.comment, ...prevComments]); // Add new comment to the start of the list
      }
    });

    return () => {
      echo.leave("broadcast-comment");
    };
  }, [authId]);

  // Refetch comments whenever shouldRefetch changes
  useEffect(() => {
    refetch(); // This will refetch the comments
  }, [shouldRefetch, refetch]);

  return (
    <>
      {/* Render the broadcasted comments first */}
      {broadcastedComments.length > 0 &&
        broadcastedComments.map((comment) => (
          <TextComment key={comment.comment_id} comment={comment} type="user" />
        ))}

      {/* Render the existing comments */}
      {allFriendRequest.length > 0
        ? allFriendRequest.map((comment) => (
            <TextComment key={comment.comment_id} comment={comment} showReplies={showReplies} />
          ))
        : !useGetAuthUserfriendRequestQueryLoading && (
            <div className="col-12 text-center">
              <h4 className="mt-5"> No Comments</h4>
            </div>
          )}

      <div
        ref={requestRef}
        className="infinite-scroll-trigger"
        style={{ height: "7vh", minHeight: "40px" }}
      >
        {useGetAuthUserfriendRequestQueryFetching && (
          <CommentSpinner size="25px" color="#ff69b3" />
        )}
      </div>
    </>
  );
}

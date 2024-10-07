import React, { useEffect, useState } from "react";
import TextComment from "../../TextComment/TextComment";
import { useGetCommentsByPostIdQuery } from "../../../../../services/commentApi";
import { useInView } from "react-intersection-observer";
import CommentSpinner from "../CommentSpinner/CommentSpinner";
import { useSelector } from "react-redux";
import echo from "../../../../../echo";

export default function AllComments({ postId }) {
  const authId = useSelector((state) => state.home.user_id);
  const { ref: requestRef, inView: inViewRequests } = useInView({
    threshold: 0,
    triggerOnce: false,
  });
  const isReplySucess = useSelector((state) => state.home.isReplySucess); // Listen to refetch trigger
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


if (useGetAuthUserfriendRequestQuerySuccess) {
  console.log(useGetAuthUserfriendRequestQueryData)
}

  // Reset everything and refetch on component mount or when postId changes
  useEffect(() => {
    // Reset pagination and comments state when component mounts or postId changes
    setFriendRequestPage(1);
    setAllFriendRequest([]);
    setHasMoreFriendRequest(true);
    setBroadcastedComments([]);
    
    // Refetch the comments when the component mounts or postId changes
    refetch();
  }, [postId, refetch]);

  // Fetch comments data and update state
  useEffect(() => {
    if (
      useGetAuthUserfriendRequestQuerySuccess &&
      useGetAuthUserfriendRequestQueryData?.data
    ) {
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
    useGetAuthUserfriendRequestQueryData,refetch
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

  // Refetch comments whenever shouldRefetch, isReplySucess, or postId changes
  useEffect(() => {
    refetch(); // This will refetch the comments
  }, [shouldRefetch, isReplySucess, postId, refetch]);

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
            <TextComment key={comment.comment_id} comment={comment} />
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

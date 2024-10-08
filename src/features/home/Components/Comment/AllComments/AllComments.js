import React, { useEffect, useState } from "react";
import TextComment from "../../TextComment/TextComment";
import { useGetCommentsByPostIdQuery } from "../../../../../services/commentApi";
import { useInView } from "react-intersection-observer";
import CommentSpinner from "../CommentSpinner/CommentSpinner";
import { useSelector } from "react-redux";
import echo from "../../../../../echo";

export default function AllComments({ postId, showReplies }) {
  const authId = useSelector((state) => state.home.user_id);
  const { ref: requestRef, inView: inViewRequests } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const [friendRequestPage, setFriendRequestPage] = useState(1);
  const [allFriendRequest, setAllFriendRequest] = useState([]);
  const [hasMoreFriendRequest, setHasMoreFriendRequest] = useState(true);

  const [broadcastedComments, setBroadcastedComments] = useState([]); // State for accumulating broadcasted comments

  /* Fetching Request data */
  const {
    data: useGetAuthUserfriendRequestQueryData,  // the fetched data
    isSuccess: useGetAuthUserfriendRequestQuerySuccess,  // check if fetch was successful
    isLoading: useGetAuthUserfriendRequestQueryLoading,  // loading state
    isError: useGetAuthUserfriendRequestQueryError,  // error state
    isFetching: useGetAuthUserfriendRequestQueryFetching,  // check if still fetching (after initial load)
    refetch  // function to manually trigger refetch
  } = useGetCommentsByPostIdQuery(
    { postId, page: friendRequestPage },  // pass your postId and page parameters
    {
      refetchOnMountOrArgChange: true,  // Ensures data is refetched when the component mounts or if postId/page changes
      refetchOnFocus: true,  // Refetches when window gains focus
    }
  );
  

 /*  // Handle new comments broadcast via Echo
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
 */
  // Update the state when new data is fetched
  useEffect(() => {
    if (useGetAuthUserfriendRequestQuerySuccess && useGetAuthUserfriendRequestQueryData?.data) {
      // If refetching from page 1, reset the existing data
      if (friendRequestPage === 1) {
        setAllFriendRequest([...useGetAuthUserfriendRequestQueryData.data]);
      } else {
        // Filter and append only new comments
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

        // If we get fewer results than the page limit, stop fetching more
        if (useGetAuthUserfriendRequestQueryData.data.length < 3) {
          setHasMoreFriendRequest(false);
        }
      }
    }
  }, [
    useGetAuthUserfriendRequestQuerySuccess,
    useGetAuthUserfriendRequestQueryData,
    friendRequestPage,
    allFriendRequest,
  ]);

  // Load more data when in view
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

  // Refetch data when shouldRefetch changes
  useEffect(() => {
 
      setFriendRequestPage(1);  // Reset to page 1
      setAllFriendRequest([]);  // Clear previous comments
      refetch();  // Trigger the refetch
    
  }, [refetch]);

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

      {/* Infinite scroll trigger */}
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

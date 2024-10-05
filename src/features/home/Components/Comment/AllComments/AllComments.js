import React, { useEffect, useState } from "react";
import TextComment from "../../TextComment/TextComment";
import { useGetCommentsByPostIdQuery } from "../../../../../services/commentApi";
import { useInView } from "react-intersection-observer";
import CommentSpinner from "../CommentSpinner/CommentSpinner";

export default function AllComments({ postId }) {
  const { ref: requestRef, inView: inViewRequests } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const [friendRequestPage, setFriendRequestPage] = useState(1);
  const [allFriendRequest, setAllFriendRequest] = useState([]);
  const [hasMoreFriendRequest, setHasMoreFriendRequest] = useState(true);

  /* Fetching Request data */
  const {
    data: useGetAuthUserfriendRequestQueryData,
    isSuccess: useGetAuthUserfriendRequestQuerySuccess,
    isLoading: useGetAuthUserfriendRequestQueryLoading,
    isError: useGetAuthUserfriendRequestQueryError,
    isFetching: useGetAuthUserfriendRequestQueryFetching,
    refetch: useGetAuthUserfriendRequestQueryRefetch,
  } = useGetCommentsByPostIdQuery({ postId, page: friendRequestPage });

  useEffect(() => {
    if (useGetAuthUserfriendRequestQuerySuccess && useGetAuthUserfriendRequestQueryData?.data) {
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
  }, [useGetAuthUserfriendRequestQuerySuccess, useGetAuthUserfriendRequestQueryData]);

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

  return (
    <>
      {allFriendRequest.length > 0 ? (
        allFriendRequest.map((comment) => (
          <TextComment key={comment.comment_id} comment={comment} />
        ))
      ) : (
        !useGetAuthUserfriendRequestQueryLoading && (
          <div className="col-12 text-center"><h4 className="mt-5"> No Commnets</h4></div>
        )
      )}

      <div
        ref={requestRef}
        className="infinite-scroll-trigger"
        style={{ height: "7vh", minHeight: "40px" }}
      >
        {useGetAuthUserfriendRequestQueryFetching && <CommentSpinner  size="25px" color="#ff69b3" />}
      </div>
    </>
  );
}

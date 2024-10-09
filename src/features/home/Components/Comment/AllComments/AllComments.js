import React, { useEffect, useState } from "react";
import TextComment from "../../TextComment/TextComment";
import { useGetCommentsByPostIdQuery } from "../../../../../services/commentApi";
import { useInView } from "react-intersection-observer";
import CommentSpinner from "../CommentSpinner/CommentSpinner";
import { useSelector } from "react-redux";
import echo from "../../../../../echo";

export default function AllComments({ postId, showReplies }) {
  const authId = useSelector((state) => state.home.user_id);
  const shouldRefetch = useSelector((state) => state.home.shouldRefetch); // Refetch trigger
  const [currentPage, setCurrentPage] = useState(1);
  const [allComments, setAllComments] = useState([]); // All comments from API
  const [broadcastedComments, setBroadcastedComments] = useState([]); // Real-time comments
  const [hasMoreComments, setHasMoreComments] = useState(true); // For pagination control

  const { ref: requestRef, inView: inViewRequests } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Fetch comments based on post ID and page number
  const {
    data: commentsData,
    isSuccess: isCommentsSuccess,
    isLoading: isCommentsLoading,
    isFetching: isCommentsFetching,
    isError: isCommentsError,
    refetch,
  } = useGetCommentsByPostIdQuery(
    { postId, page: currentPage },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

  if (isCommentsSuccess) {
    console.log(commentsData)
  }

  // Update comments state when new data is successfully fetched
  useEffect(() => {
    if (isCommentsSuccess && commentsData?.data) {
      if (currentPage === 1) {
        // Reset comments if it's the first page
        setAllComments(commentsData.data);
      } else {

        const old = commentsData.data.filter(
          (newRequest) =>
            !allComments.some(
              (request) => request.comment_id === newRequest.comment_id
            )
        );

        // Append comments if more pages are being fetched
        setAllComments((prevComments) => [

          ...prevComments,
          ...old,
        ]);
      }

      // Check if there are more comments to fetch
      if (commentsData.data.length < 3) {
        setHasMoreComments(false);
      }
    }
  }, [isCommentsSuccess, commentsData, currentPage]);

  // Trigger pagination when the trigger is in view
  useEffect(() => {
    if (inViewRequests && hasMoreComments && !isCommentsFetching) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [inViewRequests, hasMoreComments, isCommentsFetching]);

  // Handle real-time broadcasted comments
  useEffect(() => {
    const channel = echo.private("broadcast-comment");

    channel.listen(".getComment", (e) => {
      if (e.comment.commenter_id === authId) {
        setBroadcastedComments((prevComments) => [e.comment, ...prevComments]);
      }
    });

    return () => {
      echo.leave("broadcast-comment");
    };
  }, [authId]);

  // Refetch comments when the refetch trigger is activated
  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setCurrentPage(1); // Reset the page to start from the beginning
    }
  }, [shouldRefetch, refetch]);

  // Render the component
  return (
    <>
      {/* Render broadcasted comments (real-time updates) */}
      {broadcastedComments.length > 0 &&
        broadcastedComments.map((comment) => (
          <TextComment  comment={comment} type="user" />
        ))}

      {/* Render fetched comments */}
      {allComments.length > 0
        ? allComments.map((comment) => (
            <TextComment
             
              comment={comment}
              showReplies={showReplies}
            />
          ))
        : !isCommentsLoading && (
            <div className="col-12 text-center">
              <h4 className="mt-5">No Comments</h4>
            </div>
          )}

      {/* Infinite scroll trigger */}
      <div
        ref={requestRef}
        className="infinite-scroll-trigger"
        style={{ height: "7vh", minHeight: "40px" }}
      >
        {isCommentsFetching && <CommentSpinner size="25px" color="#ff69b3" />}
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import ReplyComment from "../ReplyComment";
import Spinner from "../../../../Spinner/Spinner";
import { useGetRepliesByCommentIdQuery } from "../../../../../services/repliesApi";
import CommentSpinner from "../../Comment/CommentSpinner/CommentSpinner";
import { useSelector } from "react-redux";
import echo from "../../../../../echo";

export default function AllReply({ commentId }) {
  const shouldRefetch = useSelector((state) => state.home.shouldRefetch); // Listen to refetch trigger
  const authId = useSelector((state) => state.home.user_id);
  const isReplySucess = useSelector((state) => state.home.isReplySucess); // Listen to refetch trigger
  const [friendRequestPage, setFriendRequestPage] = useState(1);
  const [allFriendRequest, setAllFriendRequest] = useState([]);
  const [hasMoreFriendRequest, setHasMoreFriendRequest] = useState(true);

  // Fetching reply data based on the current page
  const {
    data: repliesData,
    isSuccess: isRepliesSuccess,
    isLoading: isRepliesLoading,
    isError: isRepliesError,
    isFetching: isRepliesFetching,
    refetch,
  } = useGetRepliesByCommentIdQuery({ commentId, page: friendRequestPage });
  console.log(repliesData);
  useEffect(() => {
    if (isRepliesSuccess && repliesData?.data) {
      // Update hasMoreFriendRequest based on data length
      if (repliesData.data.length < 3) {
        setHasMoreFriendRequest(false);
      }

      // Filter and update the reply list with new replies
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

  // Handler for loading more replies
  const handleLoadMore = () => {
    setFriendRequestPage((prevPage) => prevPage + 1);
  };

  // Listen for broadcasted comments
  useEffect(() => {
    echo.private("broadcast-reply").listen(".getReply", (e) => {
      /*    if (e.comment.commenter_id === authId) {
        setBroadcastedComments((prevComments) => [e.comment, ...prevComments]); // Add new comment to the start of the list
      } */
      console.log(e);
    });

    return () => {
      echo.leave("broadcast-reply");
    };
  }, [authId]);

/*   useEffect(() => {
    refetch(); // This will refetch the comments
  }, [isReplySucess, refetch, shouldRefetch]); */

  return (
    <>
      {allFriendRequest.length > 0 &&
        allFriendRequest.map((comment) => {
          return <ReplyComment key={comment.reply_id} comment={comment} />;
        })}

      {isRepliesLoading && <CommentSpinner size="25px" color="#ff69b3" />}

      {hasMoreFriendRequest && !isRepliesLoading && (
        <div className="text-center mt-2">
          <button
            className="btn btn-primary"
            onClick={handleLoadMore}
            disabled={isRepliesFetching}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

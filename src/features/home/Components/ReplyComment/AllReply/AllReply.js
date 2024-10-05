import React, { useEffect, useState } from "react";
import ReplyComment from "../ReplyComment";
import Spinner from "../../../../Spinner/Spinner";
import { useGetRepliesByCommentIdQuery } from "../../../../../services/repliesApi";
import CommentSpinner from "../../Comment/CommentSpinner/CommentSpinner";

export default function AllReply({ commentId }) {
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
    refetch
  } = useGetRepliesByCommentIdQuery({ commentId, page: friendRequestPage });
console.log(repliesData);
  useEffect(() => {
    if (
      isRepliesSuccess &&
      repliesData?.data
    ) {
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

    // Handle reply success
    const handleReplySuccess = () => {
        refetch(); // Refresh the replies data
      };
  return (
    <>
      {allFriendRequest.length >0 &&
        allFriendRequest.map((comment) => {
          return <ReplyComment key={comment.reply_id} comment={comment} onReplySuccess={handleReplySuccess}  />;
        }
      )}

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

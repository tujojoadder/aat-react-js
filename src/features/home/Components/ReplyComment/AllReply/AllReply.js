import React, { useEffect, useState } from "react";
import ReplyComment from "../ReplyComment";
import Spinner from "../../../../Spinner/Spinner";
import { useGetRepliesByCommentIdQuery } from "../../../../../services/repliesApi";
import CommentSpinner from "../../Comment/CommentSpinner/CommentSpinner";
import { useSelector } from "react-redux";
import MidScreenBack from "../../../../SmallScreenBack/MidScreenBack";
import SmallScreenBack from "../../../../SmallScreenBack/SmallScreenBack";
import LargeScreenBack from "../../../../LargeScreenBack/LargeScreenBack";
import LargeScreenProfileBack from "../../../../LargeScreenBack/LargeScreenProfileBack";
import SmallScreenCommnetBack from "../../Comment/CommentsButton/SmallScreenCommnetBack";
import MidScreenCommentback from "../../Comment/CommentsButton/MidScreenCommentback";
import LargeScreenCommentBack from "../../Comment/CommentsButton/LargeScreenCommentBack";

export default function AllReply({showComments}) {
  const commentId = useSelector((state) => state.home.commentId);
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
 // Refetch when the component is first rendered (when switching to 'reply')
 useEffect(() => {
  refetch();
}, [refetch]);
  useEffect(() => {
    if (isRepliesSuccess && repliesData?.data) {
      if (repliesData.data.length < 3) {
        setHasMoreFriendRequest(false);
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

  // Handler for loading more replies
  const handleLoadMore = () => {
    setFriendRequestPage((prevPage) => prevPage + 1);
  };

  // Handle reply success
  const handleReplySuccess = () => {
    refetch();
  };


  return (
    <>
      {/* Header Section with Back Button and Replies Title */}
<SmallScreenCommnetBack showComments={showComments} />
    <MidScreenCommentback showComments={showComments} />
<LargeScreenCommentBack showComments={showComments} />

      {/* List of replies */}
      {allFriendRequest.length > 0 &&
        allFriendRequest.map((comment) => (
          <ReplyComment
            key={comment.reply_id}
            comment={comment}
            onReplySuccess={handleReplySuccess}
          />
        ))}

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

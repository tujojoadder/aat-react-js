import React, { useEffect, useState } from 'react';
import CommentedImage from '../../../../CommentedMedia/CommentedImage/CommentedImage';
import TextComment from '../../TextComment/TextComment';
import { useGetCommentsByPostIdQuery } from '../../../../../services/commentApi';
import { useInView } from 'react-intersection-observer';
import Spinner from '../../../../Spinner/Spinner';

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
      } = useGetCommentsByPostIdQuery({postId, page: friendRequestPage });
    
    
    if (useGetAuthUserfriendRequestQuerySuccess) {
        console.log(useGetAuthUserfriendRequestQueryData);
    }
    
    
   
    
      useEffect(() => {
        if (
          inViewRequests &&
          !useGetAuthUserfriendRequestQueryFetching &&
          !useGetAuthUserfriendRequestQueryError &&
          hasMoreFriendRequest &&
          useGetAuthUserfriendRequestQuerySuccess
        ) {
          console.log('Updating friendRequestPage:', friendRequestPage + 1);
          setFriendRequestPage((prevPage) => prevPage + 1);
        }
      }, [
        inViewRequests,
        useGetAuthUserfriendRequestQueryFetching,
        useGetAuthUserfriendRequestQueryError,
        hasMoreFriendRequest,
        useGetAuthUserfriendRequestQuerySuccess,
      ]);
    
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
                (request) =>
                  request.comment_id === newRequest.comment_id
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







  return (
    <>
 {allFriendRequest.length === 0 ? (
        <div className="col-12 text-center">No records</div>
      ) : (
        allFriendRequest.map((profile) => {
         
          return (
           <TextComment/>
          );
        })
      )}
      <div
        ref={requestRef}
        className="infinite-scroll-trigger"
        style={{ height: '7vh', minHeight: '40px' }}
      >
        {useGetAuthUserfriendRequestQueryLoading && <Spinner />}
      </div>
    </>
  );
}

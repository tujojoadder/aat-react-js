

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetAuthUserfriendRequestQuery } from '../../../services/friendsApi';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import { Scrollbar } from 'react-scrollbars-custom';
import FriendRequestItemSm from '../SmallScreenItem/FriendRequestItemSm/FriendRequestItemSm';
import { useMediaQuery } from 'react-responsive';
import { useGetAuthUserFriendQuery } from '../../../services/profileApi';
import AllFriendItemSm from '../SmallScreenItem/AllFriendItemSm/AllFriendItemSm';

export default function AllFriendFooterContainer() {
 
  const location = useLocation();
  const { ref: requestRef, inView: inViewRequests } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const [friendRequestPage, setFriendRequestPage] = useState(1);
  const [allFriendRequest, setAllFriendRequest] = useState([]);
  const [hasMoreFriendRequest, setHasMoreFriendRequest] = useState(true);
  const [paddingBottom, setPaddingBottom] = useState('30vh'); // Default padding

  /* Fetching Request data */
  const {
    data: useGetAuthUserfriendRequestQueryData,
    isSuccess: useGetAuthUserfriendRequestQuerySuccess,
    isLoading: useGetAuthUserfriendRequestQueryLoading,
    isError: useGetAuthUserfriendRequestQueryError,
    isFetching: useGetAuthUserfriendRequestQueryFetching,
    refetch: useGetAuthUserfriendRequestQueryRefetch,
  } = useGetAuthUserFriendQuery({ friendPage:friendRequestPage });


if (useGetAuthUserfriendRequestQuerySuccess) {
    console.log(useGetAuthUserfriendRequestQueryData);
}


  // Define media queries
  const isSmallScreen = useMediaQuery({ query: '(max-height: 600px)' });

  useEffect(() => {
    if (isSmallScreen) {
      setPaddingBottom('30vh');
    } else {
      setPaddingBottom('15vh');
    }
  }, [isSmallScreen]);

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
              request.user_id === newRequest.user_id
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
    <div style={{ paddingBottom: paddingBottom }} >
      {allFriendRequest.length === 0 ? (
        <div className="col-12 text-center">No records</div>
      ) : (
        allFriendRequest.map((profile) => {
          const isActive =
            location.pathname === `/friends/all-friends/${profile.user_id}`;
          return (
            <AllFriendItemSm
              key={profile.friend_request_id}
              name={`${profile.user_fname} ${profile.user_lname}`}
              handle={profile.identifier}
              image={profile.profile_picture}
              user_id={profile.user_id}
              isActive={isActive}
            />
          );
        })
      )}
      <div
        ref={requestRef}
        className="infinite-scroll-trigger"
        style={{ height: '7vh', minHeight: '40px' }}
      >
        {useGetAuthUserfriendRequestQueryFetching && <Spinner />}
      </div>
    </div>
  );
}

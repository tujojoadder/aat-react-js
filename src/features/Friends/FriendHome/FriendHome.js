import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import SmallScreenUnFriendUserCard from "../SmallScreenUnFriendUserCard/SmallScreenUnFriendUserCard";
import LargeScreenUnFriendUserCard from "../LargeScreenUnFriendUserCard/LargeScreenUnFriendUserCard";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import FriendsTabs from "../FriendsTabs/FriendsTabs";
import FriendRequestBack from "../FriendBack/FriendRequestBack/FriendRequestBack";
import FriendHomeBack from "../FriendBack/FriendHomeBack/FriendHomeBack";
import IChannelCreateBack from "../../IChannels/iChannelBack/iChannelCreateBack/IChannelCreateBack";
import { useGetAuthUserfriendRequestQuery, useGetFriendSuggestionQuery } from "../../../services/friendsApi";
import { useInView } from "react-intersection-observer";
import Spinner from "../../Spinner/Spinner";

export default function FriendHome() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });

  // Friend Requests State Management
  const [friendRequestPage, setFriendRequestPage] = useState(1);
  const [allFriendRequest, setAllFriendRequest] = useState([]);
  const [hasMoreFriendRequest, setHasMoreFriendRequest] = useState(true);

  // Friend Suggestions State Management
  const [friendSuggestionPage, setFriendSuggestionPage] = useState(1);
  const [allFriendSuggestions, setAllFriendSuggestions] = useState([]);
  const [hasMoreFriendSuggestions, setHasMoreFriendSuggestions] = useState(true);

  // Fetching Friend Requests
  const {
    data: useGetAuthUserfriendRequestQueryData,
    isSuccess: useGetAuthUserfriendRequestQuerySuccess,
    isLoading: useGetAuthUserfriendRequestQueryLoading,
    isError: useGetAuthUserfriendRequestQueryError,
    isFetching: useGetAuthUserfriendRequestQueryIsFetching,
    refetch: useGetAuthUserfriendRequestQueryRefetch,
  } = useGetAuthUserfriendRequestQuery({ friendRequestPage });

  // Fetching Friend Suggestions
  const {
    data: useGetFriendSuggestionQueryData,
    isSuccess: useGetFriendSuggestionQuerySuccess,
    isFetching: useGetFriendSuggestionQueryIsFetching,
    isError: useGetFriendSuggestionQueryError,
    refetch: useGetFriendSuggestionQueryRefetch,
  } = useGetFriendSuggestionQuery({ friendSuggestionPage });
if (useGetFriendSuggestionQueryIsFetching) {
  console.log(useGetFriendSuggestionQueryData);
}
  // Get reference and visibility state for friend requests
  const { ref: requestRef, inView: inViewRequests } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Get reference and visibility state for friend suggestions
  const { ref: suggestionRef, inView: inViewSuggestions } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Effect to process fetched friend request data
  useEffect(() => {
    if (useGetAuthUserfriendRequestQuerySuccess && useGetAuthUserfriendRequestQueryData?.data) {
      if (useGetAuthUserfriendRequestQueryData.data.length < 3) {
        setHasMoreFriendRequest(false); // No more data to load
      }
      const newRequests = useGetAuthUserfriendRequestQueryData.data.filter(
        (newRequest) => !allFriendRequest.some((request) => request.friend_request_id === newRequest.friend_request_id)
      );
      if (newRequests.length > 0) {
        setAllFriendRequest((prevRequests) => [...prevRequests, ...newRequests]);
      }
    }
  }, [useGetAuthUserfriendRequestQuerySuccess, useGetAuthUserfriendRequestQueryData]);

  // Effect to process fetched friend suggestion data
  useEffect(() => {
    if (useGetFriendSuggestionQuerySuccess && useGetFriendSuggestionQueryData?.data) {
      if (useGetFriendSuggestionQueryData.data.length ===0) {
        setHasMoreFriendSuggestions(false); // No more data to load
      }
      const newSuggestions = useGetFriendSuggestionQueryData.data.filter(
        (newSuggestion) => !allFriendSuggestions.some((suggestion) => suggestion.user_id === newSuggestion.user_id)
      );
      if (newSuggestions.length > 0) {
        setAllFriendSuggestions((prevSuggestions) => [...prevSuggestions, ...newSuggestions]);
      }
    }
  }, [useGetFriendSuggestionQuerySuccess, useGetFriendSuggestionQueryData]);

  // Effect to handle infinite scroll logic for friend requests
  useEffect(() => {
    if (inViewRequests && !useGetAuthUserfriendRequestQueryIsFetching && !useGetAuthUserfriendRequestQueryError && hasMoreFriendRequest && useGetAuthUserfriendRequestQuerySuccess) {
      setFriendRequestPage((prevPage) => prevPage + 1);
    }
  }, [inViewRequests, useGetAuthUserfriendRequestQueryIsFetching, useGetAuthUserfriendRequestQueryError, hasMoreFriendRequest, useGetAuthUserfriendRequestQuerySuccess]);

  // Effect to handle infinite scroll logic for friend suggestions
  useEffect(() => {
    if (inViewSuggestions && !useGetFriendSuggestionQueryIsFetching && !useGetFriendSuggestionQueryError && hasMoreFriendSuggestions && useGetFriendSuggestionQuerySuccess) {
      setFriendSuggestionPage((prevPage) => prevPage + 1);
    }
  }, [inViewSuggestions, useGetFriendSuggestionQueryIsFetching, useGetFriendSuggestionQueryError, hasMoreFriendSuggestions, useGetFriendSuggestionQuerySuccess]);

  // Handler for "See All" button for friend requests
  const handleSeeAllClick = () => {
    if (hasMoreFriendRequest && !useGetAuthUserfriendRequestQueryIsFetching) {
      setFriendRequestPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <div className="friend-home main  m-0 p-0 border-sm-0 border " style={{ backgroundColor: "white", minHeight: '100vh' }}>
        <div className="d-block d-lg-none">
          <FriendHomeBack />
          <FriendsTabs />
        </div>

        <div className="body p-2 mx-sm-3  mx-lg-0">
          {/* Friend Request Section */}
          <div className="friend-request-section">
            <h4 className="p-0 m-0 ps-2 pb-0 pt-1 mb-0">Friend Requests</h4>
            <hr className="mt-2" />
            <div className="row">
              {allFriendRequest.length === 0 ? (
                <div className="col-12 text-center">No records</div>
              ) : (
                allFriendRequest.map((profile, index) =>
                  isSmallScreen ? (
                    <SmallScreenUnFriendUserCard
                      key={index}
                      name={`${profile.user_fname} ${profile.user_lname}`}
                      handle={profile.identifier}
                      image={profile.profile_picture}
                      type="friend_request"
                    />
                  ) : (
                    <LargeScreenUnFriendUserCard
                      key={index}
                      name={`${profile.user_fname} ${profile.user_lname}`}
                      handle={profile.identifier}
                      image={profile.profile_picture}
                      type="friend_request"
                    />
                  )
                )
              )}
            </div>
            {hasMoreFriendRequest && (
              <div className="text-center mt-3">
                <button
                  className="btn btn-block py-2"
                  style={{
                    backgroundColor: "#ebedf0",
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                  }}
                  onClick={handleSeeAllClick}
                >
                  <b>See All</b>
                </button>
              </div>
            )}
          </div>

          {/* Friend Suggestion Section */}
          <div className="friend-suggestion-section mb-md-5">
            <h4 className="p-2 pt-3 pb-0 mb-0">People you may know</h4>
            <hr className="mt-2" />
            <div className="row">
              {allFriendSuggestions.length === 0 ? (
                <div className="col-12 text-center">No records</div>
              ) : (
                allFriendSuggestions.map((profile, index) =>
                  isSmallScreen ? (
                    <SmallScreenUnFriendUserCard
                      key={index}
                      name={`${profile.user_fname} ${profile.user_lname}`}
                      handle={profile.identifier}
                      image={profile.profile_picture}
                      type="suggestion"
                    />
                  ) : (
                    <LargeScreenUnFriendUserCard
                      key={index}
                      name={`${profile.user_fname} ${profile.user_lname}`}
                      handle={profile.identifier}
                      image={profile.profile_picture}
                      type="suggestion"
                    />
                  )
                )
              )}
            </div>


    {/*   //Spinner Scroll */}
    <div
        ref={suggestionRef}
        className="infinite-scroll-trigger"
        style={{height:'7vh',minHeight:'40px'}}
      >
        {useGetFriendSuggestionQueryIsFetching && <Spinner />}
      </div>



            
          </div>
        </div>
      </div>
    </>
  );
}

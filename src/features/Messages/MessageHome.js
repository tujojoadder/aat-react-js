import React, { useEffect, useState } from "react";
import "./MessageHome.css";
import { useLocation, NavLink } from "react-router-dom";
import AllFriendList from "../Friends/AllFriendList/AllFriendList";
import SearchBox from "../home/Components/SearchBox/SearchBox";
import { useGetAuthUserFriendQuery } from "../../services/profileApi";
import { useInView } from "react-intersection-observer";
import Spinner from "../Spinner/Spinner";
import NoUserSelectedToMessage from "./NoUserSelectedToMessage/NoUserSelectedToMessage";
import echo from "../../echo";
import { setUserOffline, setUserOnline } from "../home/HomeSlice";
import { useDispatch } from "react-redux";

export default function MessageHome() {


  const dispatch = useDispatch();
  
  const [isSmallOrMedium, setIsSmallOrMedium] = useState(window.innerWidth < 992);
  const [isLargeDevice, setIsLargeDevice] = useState(window.innerWidth >= 992);
  const [commentsHeight, setCommentsHeight] = useState(window.innerWidth < 576 ? "73vh" : "81vh");

  // Handle window resize
  const updateDimensions = () => {
    const windowWidth = window.innerWidth;
    setIsSmallOrMedium(windowWidth < 992);
    setIsLargeDevice(windowWidth >= 992);

    // Update height based on window size
    if (windowWidth < 576) {
      setCommentsHeight("73vh");
    } else {
      setCommentsHeight("81vh");
    }
  };

  useEffect(() => {
    // Event listener for window resize
    window.addEventListener("resize", updateDimensions);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []); // Empty dependency array ensures effect runs only on mount and unmount

  const location = useLocation();
  const { ref: requestRef, inView: inViewRequests } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const [friendRequestPage, setFriendRequestPage] = useState(1);
  const [allFriendRequest, setAllFriendRequest] = useState([]);
  const [hasMoreFriendRequest, setHasMoreFriendRequest] = useState(true);

  const {
    data: useGetAuthUserfriendRequestQueryData,
    isSuccess: useGetAuthUserfriendRequestQuerySuccess,
    isFetching: useGetAuthUserfriendRequestQueryFetching,
    isError: useGetAuthUserfriendRequestQueryError,
  } = useGetAuthUserFriendQuery({ friendPage: friendRequestPage });

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
            (request) => request.user_id === newRequest.user_id
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









  return isLargeDevice ? (
    <div
      className="message-home main mb-5"
      style={{ backgroundColor: "white", minHeight: "100vh" }}
    >
      {/* Large Device Layout */}

      <NoUserSelectedToMessage/>
    </div>
  ) : (
    <div
    className="friend-home main  m-0 p-0 border-sm-0 border-left border-right "
    style={{ backgroundColor: "white", minHeight: "100vh" }}
  >
      <SearchBox />
      <div className="mb-5">
        {allFriendRequest.length === 0 ? (
          <div className="col-12 text-center">No records</div>
        ) : (
          allFriendRequest.map((profile, index) => {
            const isActive =
              location.pathname === `/friends/all-friends/${profile.user_id}`;
            return (
              <NavLink
                key={index}
                to={`/message/${profile.user_id}`}
                className="text-decoration-none"
              >
                <AllFriendList
                  key={profile.friend_request_id}
                  name={`${profile.user_fname} ${profile.user_lname}`}
                  handle={profile.identifier}
                  image={profile.profile_picture}
                  user_id={profile.user_id}
                  isActive={isActive}
                />
              </NavLink>
            );
          })
        )}
        <div
          ref={requestRef}
          className="infinite-scroll-trigger"
          style={{ height: "7vh", minHeight: "40px" }}
        >
          {useGetAuthUserfriendRequestQueryFetching && <Spinner />}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState, useRef } from "react";
import "./FriendRight.css";
import { NavLink, useLocation, useParams } from "react-router-dom";
import SmallScreenUnFriendUserCard from "./SmallScreenUnFriendUserCard/SmallScreenUnFriendUserCard";
import { useGetAuthUserfriendRequestQuery } from "../../services/friendsApi";
import { useInView } from "react-intersection-observer";
import Spinner from "../Spinner/Spinner";
import { Scrollbar } from "react-scrollbars-custom";

export default function FriendRightFriendRequest() {
  const { id } = useParams();
  const scrollRef = useRef(null);
  const location = useLocation();
  const { ref: requestRef, inView: inViewRequests } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const [friendRequestPage, setFriendRequestPage] = useState(1);
  const [allFriendRequest, setAllFriendRequest] = useState([]);
  const [hasMoreFriendRequest, setHasMoreFriendRequest] = useState(true);
  const [paddingBottom, setPaddingBottom] = useState('15vh'); // Default padding

  const {
    data: useGetAuthUserfriendRequestQueryData,
    isSuccess: useGetAuthUserfriendRequestQuerySuccess,
    isLoading: useGetAuthUserfriendRequestQueryLoading,
    isError: useGetAuthUserfriendRequestQueryError,
    isFetching: useGetAuthUserfriendRequestQueryFetching,
    refetch: useGetAuthUserfriendRequestQueryRefetch,
  } = useGetAuthUserfriendRequestQuery({ friendRequestPage });

  useEffect(() => {
    console.log("Fetching data state:", {
      friendRequestPage,
      useGetAuthUserfriendRequestQueryData,
      useGetAuthUserfriendRequestQueryFetching,
      inViewRequests,
    });
  }, [
    friendRequestPage,
    useGetAuthUserfriendRequestQueryData,
    useGetAuthUserfriendRequestQueryFetching,
    inViewRequests,
  ]);

  useEffect(() => {
    if (
      inViewRequests &&
      !useGetAuthUserfriendRequestQueryFetching &&
      !useGetAuthUserfriendRequestQueryError &&
      hasMoreFriendRequest &&
      useGetAuthUserfriendRequestQuerySuccess
    ) {
      console.log("Updating friendRequestPage:", friendRequestPage + 1);
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
              request.friend_request_id === newRequest.friend_request_id
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

  // Effect to adjust padding based on screen height
  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 600) {
        setPaddingBottom('15vh');
      } else {
        setPaddingBottom('4vh');
      }
    };

    handleResize(); // Initial check

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <div
        ref={scrollRef}
        className="scroll-container w-100"
        style={{ overflowY: "hidden", height: "100vh" }}
      >
        <div
          style={{ overflow: "hidden" }}
          className="col-lg-3 ms-1 p-0 m-0 friend_right_side_bar bg-body rounded"
        >
          <div className="menu-container" style={{ height: "100%" }}>
            <div
              className="menu mb-3"
              style={{ height: "45vh", minHeight: "310px" }}
            >
              <h3 className="menu-header text-left ps-5 text-dark">Friends</h3>
              <ul className="nav flex-column">
                <li className="nav-item w-100">
                  <NavLink end to="/friends" className="nav-link">
                    <i className="fas fa-user-friends me-2"></i> Home
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink end to="/friends/requests" className="nav-link">
                    <i className="fas fa-user-plus fa-fw me-2"></i> Friend requests
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink end to="/friends/suggestions" className="nav-link">
                    <i className="fas fa-lightbulb fa-fw me-2"></i> Suggestions
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink end to="/friends/sent-requests" className="nav-link">
                    <i className="fa fa-user-plus me-2" aria-hidden="true"></i> Sent requests
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink end to="/friends/all-friends" className="nav-link">
                    <i className="fas fa-users fa-fw me-2"></i> All friends
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Bottom section */}
            <div className="pe-3">
              <h5>Friend Requests</h5>
              <Scrollbar style={{ width: "100%", height: "calc(55vh - 7vh)" }}>
                <div style={{ paddingBottom: paddingBottom }}>
                  {allFriendRequest.length === 0 ? (
                    <div className="col-12 text-center">No records</div>
                  ) : (
                    allFriendRequest.map((profile) => (
                      <SmallScreenUnFriendUserCard
                        key={profile.friend_request_id}
                        name={`${profile.user_fname} ${profile.user_lname}`}
                        handle={profile.identifier}
                        image={profile.profile_picture}
                        type="friend_request"
                        user_id={profile.user_id}
                      />
                    ))
                  )}
                  <div
                    ref={requestRef}
                    className="infinite-scroll-trigger"
                    style={{ height: "7vh", minHeight: "40px" }}
                  >
                    {useGetAuthUserfriendRequestQueryFetching && <Spinner />}
                  </div>
                </div>
              </Scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

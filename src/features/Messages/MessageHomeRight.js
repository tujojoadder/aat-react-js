import React, { useEffect, useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { NavLink, useLocation } from "react-router-dom";
import AllFriendList from "../Friends/AllFriendList/AllFriendList";
import { useGetAuthUserFriendQuery } from "../../services/profileApi";
import { useInView } from "react-intersection-observer";
import Spinner from "../Spinner/Spinner";

export default function FriendRightAllFriends() {
  const scrollRef = React.useRef(null);

  const location = useLocation();
  const { ref: requestRef, inView: inViewRequests } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const [friendRequestPage, setFriendRequestPage] = useState(1);
  const [allFriendRequest, setAllFriendRequest] = useState([]);
  const [hasMoreFriendRequest, setHasMoreFriendRequest] = useState(true);
  const [paddingBottom, setPaddingBottom] = useState("30vh"); // Default padding

  /* Fetching Request data */
  const {
    data: useGetAuthUserfriendRequestQueryData,
    isSuccess: useGetAuthUserfriendRequestQuerySuccess,
    isLoading: useGetAuthUserfriendRequestQueryLoading,
    isError: useGetAuthUserfriendRequestQueryError,
    isFetching: useGetAuthUserfriendRequestQueryFetching,
    refetch: useGetAuthUserfriendRequestQueryRefetch,
  } = useGetAuthUserFriendQuery({ friendPage: friendRequestPage });

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

  return (
    <div style={{ overflowX: "hidden" }}>
      <div
        ref={scrollRef}
        className="scroll-container w-100"
        style={{ position: "fixed", height: "100vh", overflow: "hidden" }}
      >
        <div
          className="col-lg-3 ms-1 p-0 m-0 friend_right_side_bar bg-body rounded"
          style={{
            display: "grid",
            gridTemplateRows: "auto 1fr", // Auto height for header, flexible height for the content
            height: "100%",
          }}
        >
          {/* Header Section */}
          <div
            className="menu-header text-left ps-5 text-dark"
            style={{ padding: "10px 0" }}
          >
            <h3 style={{ margin: 0 }}>Message now</h3>
          </div>

          {/* Scrollable User List Section */}
          <div
            className="scrollable-list"
            style={{
              overflowY: "auto", // Make this section scrollable
            }}
          >
            <Scrollbar style={{ width: "100%", height: "100%" }}>
              <div className="mb-1">
                {allFriendRequest.length === 0 ? (
                  <div className="col-12 text-center">No records</div>
                ) : (
                  allFriendRequest.map((profile,index) => {
                    const isActive =
                      location.pathname ===
                      `/friends/all-friends/${profile.user_id}`;
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
            </Scrollbar>
          </div>
        </div>
      </div>
    </div>
  );
}

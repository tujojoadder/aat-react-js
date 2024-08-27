import React, { useEffect, useState } from "react";
import "./FriendRight.css";
import { Scrollbar } from "react-scrollbars-custom";
import { NavLink, useLocation } from "react-router-dom";
import SendFriendRequest from "../home/Components/SendFriendRequest/SendFriendRequest";
import { useGetFriendSuggestionQuery } from "../../services/friendsApi";
import { useInView } from "react-intersection-observer";
import SmallScreenUnFriendUserCard from "./SmallScreenUnFriendUserCard/SmallScreenUnFriendUserCard";
import Spinner from "../Spinner/Spinner";
import SuggestionItemSm from "../ItemContainner/SmallScreenItem/SuggestionItemSm/SuggestionItemSm";

export default function FriendRightFriendSuggestions() {
  const scrollRef = React.useRef(null);
  const [paddingBottom, setPaddingBottom] = useState("15vh"); // Default padding
  // Effect to adjust padding based on screen height
  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 600) {
        setPaddingBottom("15vh");
      } else {
        setPaddingBottom("4vh");
      }
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Friend Suggestions State Management
  const [friendSuggestionPage, setFriendSuggestionPage] = useState(1);
  const [allFriendSuggestions, setAllFriendSuggestions] = useState([]);
  const [hasMoreFriendSuggestions, setHasMoreFriendSuggestions] =
    useState(true);

  // Fetching Friend Suggestions
  const {
    data: useGetFriendSuggestionQueryData,
    isSuccess: useGetFriendSuggestionQuerySuccess,
    isFetching: useGetFriendSuggestionQueryIsFetching,
    isError: useGetFriendSuggestionQueryError,
    refetch: useGetFriendSuggestionQueryRefetch,
  } = useGetFriendSuggestionQuery({ friendSuggestionPage });

  // Get reference and visibility state for friend suggestions
  const { ref: suggestionRef, inView: inViewSuggestions } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Effect to process fetched friend suggestion data
  useEffect(() => {
    if (
      useGetFriendSuggestionQuerySuccess &&
      useGetFriendSuggestionQueryData?.data
    ) {
      if (useGetFriendSuggestionQueryData.data.length === 0) {
        setHasMoreFriendSuggestions(false); // No more data to load
      }
      const newSuggestions = useGetFriendSuggestionQueryData.data.filter(
        (newSuggestion) =>
          !allFriendSuggestions.some(
            (suggestion) => suggestion.user_id === newSuggestion.user_id
          )
      );
      if (newSuggestions.length > 0) {
        setAllFriendSuggestions((prevSuggestions) => [
          ...prevSuggestions,
          ...newSuggestions,
        ]);
      }
    }
  }, [useGetFriendSuggestionQuerySuccess, useGetFriendSuggestionQueryData]);

  // Effect to handle infinite scroll logic for friend suggestions
  useEffect(() => {
    if (
      inViewSuggestions &&
      !useGetFriendSuggestionQueryIsFetching &&
      !useGetFriendSuggestionQueryError &&
      hasMoreFriendSuggestions &&
      useGetFriendSuggestionQuerySuccess
    ) {
      setFriendSuggestionPage((prevPage) => prevPage + 1);
    }
  }, [
    inViewSuggestions,
    useGetFriendSuggestionQueryIsFetching,
    useGetFriendSuggestionQueryError,
    hasMoreFriendSuggestions,
    useGetFriendSuggestionQuerySuccess,
  ]);

  const location = useLocation();
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
                  <NavLink to="/friends/requests" className="nav-link">
                    <i className="fas fa-user-plus fa-fw me-2"></i> Friend
                    requests
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink
                    end
                    to="/friends/suggestions"
                    className={({ isActive }) =>
                      isActive ||
                      location.pathname.startsWith("/friends/suggestions")
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    <i className="fas fa-lightbulb fa-fw me-2"></i> Suggestions
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink end to="/friends/sent-requests" className="nav-link">
                    <i className="fa fa-user-plus me-2" aria-hidden="true"></i>{" "}
                    Sent requests
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

            <h5>Friend Suggestions</h5>
            <Scrollbar style={{ width: "100%", height: "calc(55vh - 7vh)" }}>
              <div style={{ paddingBottom: paddingBottom }}>
               
                  {allFriendSuggestions.length === 0 ? (
                    <div className="col-12 text-center">No records</div>
                  ) : (
                    allFriendSuggestions.map((profile) => {
                      const isActive = location.pathname === `/friends/suggestions/${profile.user_id}`;
                      return (
                        <SuggestionItemSm
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
     
                {/*   //Spinner Scroll */}
                <div
                  ref={suggestionRef}
                  className="infinite-scroll-trigger"
                  style={{ height: "7vh", minHeight: "40px" }}
                >
                  {useGetFriendSuggestionQueryIsFetching && <Spinner />}
                </div>
              </div>
            </Scrollbar>
          </div>
        </div>
      </div>
    </div>
  );
}

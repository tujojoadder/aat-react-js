import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import SendFriendRequest from "./Components/SendFriendRequest/SendFriendRequest";
import SearchBox from "./Components/SearchBox/SearchBox";
import HadithBox from "./Components/Hadithbox/HadithBox";
import { Scrollbars } from "react-custom-scrollbars";
import { useFriendSuggestionhomeQuery } from "../../services/friendsApi";

export default function Homeleft() {
  const { data: suggestion, isFetching, isError, refetch } = useFriendSuggestionhomeQuery();

  const location = useLocation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const localStorageKey = "scrollPositionPage"; // Unique key for this component

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = parseInt(localStorage.getItem(localStorageKey)) || 0;
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScroll = () => {
    localStorage.setItem(localStorageKey, scrollRef.current.scrollTop);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const goToTable = () => {
    navigate("/table");
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div ref={scrollRef} className="scroll-container w-100" style={{ overflowY: "hidden", position: "fixed" }}>
        <div className="col-lg-3 p-0 m-0 right_side_bar">
          {/* Search box */}
          <SearchBox />

          {/* Hadith box */}
          <HadithBox />

          {/* Friend Suggestion */}
          <h5 className="ms-1 mt-3 me-5">Friend Suggestions</h5>
          <Scrollbars style={{ width: "100%", height: "27vh" }}>
            <div className="mb-4">
              {isFetching ? (
                <div>Loading...</div>
              ) : isError ? (
                <div>Error fetching suggestions</div>
              ) : (
                suggestion?.data?.map((profile, index) => {
                  const isActive = location.pathname === `/profile/${profile.user_id}`;
                  return (
                 
                      <div className="col-12 mb-2">
                        <SendFriendRequest
                        user_id={`${profile.user_id}`}
                          name={`${profile.user_fname} ${profile.user_lname}`}
                          handle={`@${profile.identifier}`}
                          image={profile.profile_picture || "default_image_url_here"}
                          isActive={isActive}
                        />
                      </div>
                   
                  );
                })
              )}
            </div>
          </Scrollbars>
        </div>
      </div>
    </div>
  );
}

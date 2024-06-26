import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SendFriendRequest from "./Components/SendFriendRequest/SendFriendRequest";
import SearchBox from "./Components/SearchBox/SearchBox";
import HadithBox from "./Components/Hadithbox/HadithBox";
import SuggestedFriend from "./Components/SuggestedFriend/SuggestedFriend";

export default function Homeleft() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const localStorageKey = "scrollPositionPage"; // Unique key for this component

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop =
        parseInt(localStorage.getItem(localStorageKey)) || 0;
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
      <div
        ref={scrollRef}
        className="scroll-container w-100"
        style={{ overflowY: "hidden", position: "fixed" }}
      >
        <div className="col-lg-3 p-0 m-0 right_side_bar">
          {/* search box  */}
          <SearchBox />

          {/* hadis box */}
          <HadithBox />

          <SuggestedFriend />
        </div>
      </div>
   
    </div>
  );
}

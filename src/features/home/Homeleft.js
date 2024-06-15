import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Homeleft.css";
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
        className="scroll-container"
        style={{ overflowY: "scroll", position: "fixed" }}
      >
        <div className="">
          <div
            class="col-lg-3 d-none d-lg-block  w-25 h-25 right_side_bar"
            style={{ width: "300px" }} // Set a fixed width for the container
          >
            {/* search box  */}
            <SearchBox />

            {/* hadis box */}
<HadithBox/>
            

            <SuggestedFriend/>
          </div>
        </div>
      </div>
    </div>
  );
}

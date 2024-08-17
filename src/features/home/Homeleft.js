import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SendFriendRequest from "./Components/SendFriendRequest/SendFriendRequest";
import SearchBox from "./Components/SearchBox/SearchBox";
import HadithBox from "./Components/Hadithbox/HadithBox";
import SuggestedFriend from "./Components/SuggestedFriend/SuggestedFriend";
import { Scrollbars } from "react-custom-scrollbars";
import myImage from './logo.jpg'; // Adjust the path as needed

export default function Homeleft() {
  const profiles = [
    {
      name: "Mark Rockwell",
      handle: "@mark_rockwell",
      image:
       {myImage}
    },
    {
      name: "Jane Doe",
      handle: "@jane_doe",
      image:
      {myImage}
    },
    {
      name: "John Smith",
      handle: "@john_smith",
      image:
        "https://images.app.goo.gl/5N63q48UYsovMsd57",
    },{
      name: "Jane Doe",
      handle: "@jane_doe",
      image:
        "https://images.app.goo.gl/5N63q48UYsovMsd57",
    },
    {
      name: "John Smith",
      handle: "@john_smith",
      image:
        "https://images.app.goo.gl/5N63q48UYsovMsd57",
    },{
      name: "Jane Doe",
      handle: "@jane_doe",
      image:
        "https://images.app.goo.gl/5N63q48UYsovMsd57",
    },
    {
      name: "John cena",
      handle: "@john_smith",
      image:
        "https://images.app.goo.gl/5N63q48UYsovMsd57",
    },
  ];

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

          {/* Suggestion */}

          <h5 className="ms-1  mt-3 me-5">Friend Suggestions</h5>
            <Scrollbars style={{ width: "100%", height: "27vh" }}>
              <div className="mb-4">
                {profiles.map((profile, index) => {

                  return (
                 
                      <div className="col-12 mb-2">
                        <SendFriendRequest
                          name={profile.name}
                          handle={profile.handle}
                          image={profile.image}
                          
                        />
                      </div>
                   
                  );
                })}
              </div>
            </Scrollbars>
          
        </div>
      </div>
   
    </div>
  );
}

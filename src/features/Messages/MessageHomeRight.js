

import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink, useLocation } from "react-router-dom";
import AllFriendList from "../Friends/AllFriendList/AllFriendList";

export default function FriendRightAllFriends() {
  const scrollRef = React.useRef(null);
  const profiles = [
    {
      name: "MarkRockwell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "JaneDoe",
      handle: "@jane_doe",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "JohnSmith",
      handle: "@john_smith",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },{
        name: "MarkRockdwell",
        handle: "@mark_rockwell",
        image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
      },
      {
        name: "JanedDoe",
        handle: "@jane_doe",
        image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
      },
      {
        name: "JohnSmidth",
        handle: "@john_smith",
        image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
      },{
        name: "MarkRodckwell",
        handle: "@mark_rockwell",
        image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
      },
      {
        name: "JaneDdoe",
        handle: "@jane_doe",
        image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
      },
      {
        name: "JohnSmfith",
        handle: "@john_smith",
        image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
      },{
        name: "MarkRockwevll",
        handle: "@mark_rockwell",
        image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
      },
      {
        name: "JaneDvoe",
        handle: "@jane_doe",
        image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
      },
      {
        name: "JohnSmvith",
        handle: "@john_smith",
        image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
      },
    // Add more profiles as needed
  ];

  const location = useLocation();

  return (
    <div style={{ overflowX: "hidden" }}>
      <div
        ref={scrollRef}
        className="scroll-container w-100"
        style={{ overflowY: "hidden", position: "fixed " }}
      >
        <div
          style={{ overflow: "hidden" }}
          className="col-lg-3 ms-1 p-0 m-0 friend_right_side_bar bg-body rounded"
        >
          <div className="menu-container" style={{ height: "100vh" }}>
            
            <h5 className="ms-3 py-3 mb-1 text-center">Message now</h5>
            <Scrollbars
              style={{ width: "100%", height: "100vh", minHeight: "300px" }}
            >
              <div className="mb-5">
                {profiles.map((profile, index) => {
                  const isActive =
                    location.pathname === `/message/${profile.name}`;
                  return (
                    <NavLink
                      key={index}
                      to={`/message/${profile.name}`}
                      className="text-decoration-none"
                    >
                      <div className="col-12 mb-2">
                        <AllFriendList
                          name={profile.name}
                          handle={profile.handle}
                          image={profile.image}
                          isActive={isActive}
                        />
                      </div>
                    </NavLink>
                  );
                })}
              </div>
            </Scrollbars>
          </div>
        </div>
      </div>
    </div>
  );
}

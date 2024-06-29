import React from "react";
import "./FriendRight.css";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink, useLocation } from "react-router-dom";
import SendFriendRequest from "../home/Components/SendFriendRequest/SendFriendRequest";

export default function FriendRightFriendSuggestions() {
  const scrollRef = React.useRef(null);
  const profiles = [
    {
      name: "MarkRocdkwell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "JaneDcove",
      handle: "@jane_doe",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },{
      name: "MarkRockwell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "JaneDdvdoe",
      handle: "@jane_doe",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },{
      name: "MarkRockwdvdell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "jon cena",
      handle: "@jane_doe",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    // Add other profiles here...
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
            <div className="menu" style={{ height: "45vh", minHeight: "310px" }}>
              <h3 className="menu-header text-left ps-2 text-dark">Friends</h3>
              <ul className="nav flex-column">
                <li className="nav-item w-100">
                  <NavLink
                    end
                    to="/friends"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fas fa-user-friends me-2"></i> Home
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink
                    end
                    to="/friends/requests"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fas fa-user-plus fa-fw me-2"></i> Friend requests
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink
                    end
                    to="/friends/suggestions"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fas fa-lightbulb fa-fw me-2"></i> Suggestions
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink
                    end
                    to="/friends/sent-requests"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fa fa-user-plus me-2" aria-hidden="true"></i> Sent requests
                  </NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink
                    end
                    to="/friends/all-friends"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="fas fa-users fa-fw me-2"></i> All friends
                  </NavLink>
                </li>
              </ul>
            </div>
            <h5 className="ms-3">Friend Suggestions</h5>
            <Scrollbars style={{ width: "100%", height: "55vh", minHeight: "300px" }}>
              <div className="mb-5">
                {profiles.map((profile, index) => {
                  const isActive = location.pathname === `/friends/suggestions/${profile.name}`;
                  return (
                    <NavLink
                      key={index}
                      to={`/friends/suggestions/${profile.name}`}
                      className="text-decoration-none"
                    >
                      <div className="col-12 mb-2">
                        <SendFriendRequest
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

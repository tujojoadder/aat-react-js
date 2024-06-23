import React from "react";
import "./FriendRight.css";
import SuggestedFriend from "../home/Components/SuggestedFriend/SuggestedFriend";

const FriendRight = () => {
  const scrollRef = React.useRef(null);

  return (
    <div style={{ overflowX: "hidden" }}>
      <div
        ref={scrollRef}
        className="scroll-container w-100"
        style={{ overflowY: "hidden", position: "fixed " }}
      >
        <div className="col-lg-3 ms-1  p-0 m-0 friend_right_side_bar bg-body rounded">
          <div className="menu-container" style={{ height: "100vh" }}>
            <h2 className="menu-header text-left ps-3">Friends</h2>
            <nav className="nav flex-column">
              <a className="nav-link " href="#friend-requests">
                <i className="fas fa-user-friends"></i> Home
              </a>
              <a className="nav-link active" href="#friend-requests">
                <i className="fas fa-user-plus fa-fw"></i> Friend requests
              </a>

              <a className="nav-link" href="#suggestions">
                <i className="fas fa-lightbulb fa-fw"></i> Suggestions
              </a>

              <a className="nav-link" href="#suggestions">
                <i className="fa fa-user-plus" aria-hidden="true"></i> Sent
                requests
              </a>
              <a className="nav-link" href="#all-friends">
                <i className="fas fa-users fa-fw"></i> All friends
              </a>
            </nav>
          </div>
    



        </div>
      </div>
    </div>
  );
};

export default FriendRight;

import React from "react";
import "./FriendRight.css";
import SuggestedFriend from "../home/Components/SuggestedFriend/SuggestedFriend";
import { Scrollbars } from "react-custom-scrollbars";
import SmallScreenCard from "./SmallScreenCard/SmallScreenCard";
const FriendRight = () => {
  const scrollRef = React.useRef(null);
  const profiles = [
    {
      name: "Mark Rockwell",
      handle: "@mark_rockwell",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "Jane Doe",
      handle: "@jane_doe",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "John Smith",
      handle: "@john_smith",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "John Smith",
      handle: "@john_smith",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "John Smith",
      handle: "@john_smith",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "John Smith",
      handle: "@john_smith",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "John Smith",
      handle: "@john_smith",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "John Smith",
      handle: "@john_smith",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    }
  ];
  return (
    <div style={{ overflowX: "hidden" }}>
      <div
        ref={scrollRef}
        className="scroll-container w-100"
        style={{ overflowY: "hidden", position: "fixed " }}
      >
        <div
          style={{ overflow: "hidden" }}
          className="col-lg-3 ms-1  p-0 m-0 friend_right_side_bar bg-body rounded"
        >
          <div className="menu-container" style={{ height: "100vh" }}>
            <div className="menu" style={{ height: "45vh",minHeight:'310px' }}>
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
<h5 className="text-center">Friend Requests</h5>
            <Scrollbars
              style={{ width: "100%", height: "54vh", minHeight: "300px" }}
            className="p-5 "
            >
              {profiles.map((profile, index) =>

            <div key={index} className="col-12 mb-2">
              <SmallScreenCard name={profile.name} handle={profile.handle} image={profile.image}/>
            </div>
          
        )}

            </Scrollbars>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRight;

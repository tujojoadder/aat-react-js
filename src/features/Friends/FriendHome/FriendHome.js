import React from "react";
import { useMediaQuery } from "react-responsive";
import SmallScreenUnFriendUserCard from "../SmallScreenUnFriendUserCard/SmallScreenUnFriendUserCard";
import LargeScreenUnFriendUserCard from "../LargeScreenUnFriendUserCard/LargeScreenUnFriendUserCard";
import AllFriendList from "../AllFriendList/AllFriendList";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

export default function FriendHome() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });

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
  ];

  return (
    <div className="friend-home main border" style={{ backgroundColor: "white" }}>
      {/* Friend Request Section */}
      <div className="friend-request-section ">
        <h4 className="p-2">Friend Requests</h4>
        <div className="row">
          {profiles.length === 0 ? (
            <div className="col-12 text-center">No records</div>
          ) : (
            profiles.map((profile, index) =>
              isSmallScreen ? (
                <SmallScreenUnFriendUserCard
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                  type="friend_request"
                />
              ) : (
                <LargeScreenUnFriendUserCard
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                  type="friend_request"
                />
              )
            )
          )}
        </div>
        {profiles.length >= 3 && (
          <div className="text-center mt-3">
            <button
              className="btn btn-block "
              style={{
                backgroundColor: "#ebedf0",
                outline: "none",
                boxShadow: "none",
                border: "none",
              }}
            >
              See All
            </button>
          </div>
        )}
      </div>

      {/* Friend Suggestion Section */}
      <div className="friend-suggestion-section mb-md-5">
        <h4 className="p-2 pt-3">People you may know</h4>
        <div className="row">
          {profiles.length === 0 ? (
            <div className="col-12 text-center">No records</div>
          ) : (
            profiles.map((profile, index) =>
              isSmallScreen ? (
                <SmallScreenUnFriendUserCard
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                  type="suggestion"
                />
              ) : (
                <LargeScreenUnFriendUserCard
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                  type="suggestion"
                />
              )
            )
          )}
        </div>
        {profiles.length >= 3 && (
          <div className="text-center mt-3">
            <button
              className="btn btn-block"
              style={{
                backgroundColor: "#ebedf0",
                outline: "none",
                boxShadow: "none",
                border: "none",
              }}
            >
              See All
            </button>
          </div>
        )}
      </div>

      {/* All Friends Section */}
      {isSmallScreen && (
        <div className="all-friends-section pb-4">
          <h4 className="p-2 pt-3">All friends</h4>
          <div className="row">
            {profiles.length === 0 ? (
              <div className="col-12 text-center">No records</div>
            ) : (
              profiles.map((profile, index) => (
                <AllFriendList
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                  type="suggestion"
                />
              ))
            )}
          </div>
          {profiles.length >= 3 && (
            <div className="text-center mt-3">
              <button
                className="btn btn-block"
                style={{
                  backgroundColor: "#ebedf0",
                  outline: "none",
                  boxShadow: "none",
                  border: "none",
                }}
              >
                See All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

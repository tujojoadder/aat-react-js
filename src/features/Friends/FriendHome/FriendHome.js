import React from "react";
import Friends from "../Friends";
import { useMediaQuery } from "react-responsive";
import SmallScreenCard from "../SmallScreenUnFriendUserCard/SmallScreenUnFriendUserCard";
import LargeScreenCard from "../LargeScreenUnFriendUserCard/LargeScreenUnFriendUserCard";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import LargeScreenUnFriendUserCard from "../LargeScreenUnFriendUserCard/LargeScreenUnFriendUserCard";
import SmallScreenUnFriendUserCard from "../SmallScreenUnFriendUserCard/SmallScreenUnFriendUserCard";

export default function FriendHome() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });

  const profiles = [
    {
      name: "Mark Rockwell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "Jane Doe",
      handle: "@jane_doe",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "John Smith",
      handle: "@john_smith",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    }
  ];

  return (
    <>
      <div className="friend-home main  ">
        {/* Friend Request Section */}

        
        <div className="friend-request-section ">
          <h4 className="p-2">Friend Requests</h4>
         {/*  Only three record will retrive in inisial state */}
          <div className="row">
            {profiles.map((profile, index) => (
              isSmallScreen ? (
                <SmallScreenUnFriendUserCard
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                  type='friend_request'
                />
              ) : (
                <LargeScreenUnFriendUserCard
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                   type='friend_request'
                />
              )
            ))}
          </div>

          {/* See All Button */}
          <div className="text-center mt-3">
            <button 
              className="btn btn-block"
              style={{
                backgroundColor: '#ebedf0',
                outline: 'none',
                boxShadow: 'none',
                border:'none'
              }}
            >
              See All
            </button>
          </div>
        </div>



      {/*   Friend Suggestion Section */}
        <div className="friend-suggestion-section pb-5">
        <h4 className="p-2 pt-3">People you may know</h4>
         {/* 12 record will retrive in inisial state */}
          <div className="row">
            {profiles.map((profile, index) => (
              isSmallScreen ? (
                <SmallScreenUnFriendUserCard
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                  type='suggestion'
                />
              ) : (
                <LargeScreenUnFriendUserCard
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                   type='suggestion'
                />
              )
            ))}
          </div>

          {/* See All Button */}
          <div className="text-center mt-3">
            <button 
              className="btn btn-block"
              style={{
                backgroundColor: '#ebedf0',
                outline: 'none',
                boxShadow: 'none',
                border:'none'
              }}
            >
              See All
            </button>
          </div>



            </div>







      </div>
    </>
  );
}

import React from "react";
import { useMediaQuery } from "react-responsive";
import "./.././../all.css";
import "./.././../style.css";
import SmallScreenCard from "./SmallScreenUnFriendUserCard/SmallScreenUnFriendUserCard";
import LargeScreenCard from "./LargeScreenUnFriendUserCard/LargeScreenUnFriendUserCard";
import SmallScreenFriendRequestCard from "./SmallScreenUnFriendUserCard/SmallScreenUnFriendUserCard";
import LargeScreenFriendRequestCard from "./LargeScreenUnFriendUserCard/LargeScreenUnFriendUserCard";

export default function Friends() {
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
    },
    {
      name: "John Smith",
      handle: "@john_smith",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
  ];

  return (
    <div className="container " >
      <div className="row">
        {profiles.map((profile, index) => (
          isSmallScreen ? (
            <SmallScreenFriendRequestCard
              key={index}
              name={profile.name}
              handle={profile.handle}
              image={profile.image}
            />
          ) : (
            <LargeScreenFriendRequestCard
              key={index}
              name={profile.name}
              handle={profile.handle}
              image={profile.image}
            />
          )
        ))}
      </div>
    </div>
  );
}

import React from "react";
import { useMediaQuery } from "react-responsive";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import SmallScreenCard from "./GroupsSuggestionCard/SmallScreenCard";
import LargeScreenCard from "./GroupsSuggestionCard/LargeScreenCard.js";
import GroupsTabs from "./GroupsTabs/GroupsTabs.js";

export default function FriendHome() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });

  const profiles = [
    {
      name: "Mark Rockwell bjbbi jnj",
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
    },{
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
    },{
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
    },{
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
    },{
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
     /* <<<--- Scroll Needed --->>> */

    <div className="friend-home main border-left border-right " style={{ backgroundColor: "white",marginLeft:'0px',padding:'0px'}}>
   <div className="d-block d-lg-none">
        <GroupsTabs />
      </div>
      {/* Friend Request Section */}
      <div className="friend-request-section mb-5 mx-2 ">
        <h5 className="p-2" >Suggested for you</h5>
        <div className="row">
          {profiles.length === 0 ? (
            <div className="col-12 text-center">No records</div>
          ) : (
            profiles.map((profile, index) =>
              isSmallScreen ? (
               
                <SmallScreenCard
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                  type='suggestions'
                
                />
               
              ) : (
                
                <LargeScreenCard
               
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                  type='suggestions'
                />
             
              )
            )
          )}
        </div>
      </div>

      

      
    </div>
  );
}

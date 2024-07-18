
import React from "react";
import { useMediaQuery } from "react-responsive";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import PageSmallScreenCard from "../../Page/PageSmallScreenCard/PageSmallScreenCard";
import PageLargeScreenCard from "../../Page/PageLargeScreenCard/PageLargeScreenCard";
import IChannelSmallScreenCard from "../IChannelSmallScreenCard/IChannelSmallScreenCard";
import IChannelLargeScreenCard from "../IChannelLargeScreenCard/IChannelLargeScreenCard";
import IChannelTabs from "../IChannelTabs/IChannelTabs";
import ChannelFollowingBack from "../iChannelBack/ChannelFollowingBack/ChannelFollowingBack";

export default function IChannelFollowing() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });

  const profiles = [
    {
      name: "Marknj",
      handle: "@mark_rockwell",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "JanedDoe",
      handle: "@jane_doe",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "JohcsSmith",
      handle: "@john_smith",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },{
      name: "MarcsRockwell",
      handle: "@mark_rockwell",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "JancsDoe",
      handle: "@jane_doe",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "JohcsSmith",
      handle: "@john_smith",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },{
      name: "MarcsRockwell",
      handle: "@mark_rockwell",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "JancsDoe",
      handle: "@jane_doe",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "JohcsSmith",
      handle: "@john_smith",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },{
      name: "MarcsRockwell",
      handle: "@mark_rockwell",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "JancsDoe",
      handle: "@jane_doe",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "Johcsmith",
      handle: "@john_smith",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },{
      name: "MarcsRockwell",
      handle: "@mark_rockwell",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "JancsDoe",
      handle: "@jane_doe",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "JohcsSmith",
      handle: "@john_smith",
      image:
        "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
  ];

  return (
     /* <<<--- Scroll Needed --->>> */

    <div className="friend-home main border-left border-right " style={{ backgroundColor: "white",marginLeft:'0px',padding:'0px'}}>


 {/*  IChnnels tabs */}
<div className="d-block d-lg-none">
 <ChannelFollowingBack/>
      </div>
      {/* Friend Request Section */}
      <div className="friend-request-section mb-5 mx-2 ">
        <h5 className="p-2" >Following channels</h5>
        <div className="row">
          {profiles.length === 0 ? (
            <div className="col-12 text-center">No records</div>
          ) : (
            profiles.map((profile, index) =>
              isSmallScreen ? (
               
                <IChannelSmallScreenCard
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                  type='following'
                
                />
               
              ) : (
                
                <IChannelLargeScreenCard
               
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                  type='following'
                />
             
              )
            )
          )}
        </div>
      </div>

      

      
    </div>
  );
}

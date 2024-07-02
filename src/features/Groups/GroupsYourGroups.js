
import { useMediaQuery } from "react-responsive";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import SmallScreenCard from "./GroupsSuggestionCard/SmallScreenCard";
import LargeScreenCard from "./GroupsSuggestionCard/LargeScreenCard.js";
import GroupsTabs from "./GroupsTabs/GroupsTabs.js";

export default function GroupsYourGroups() {
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

    <div className="friend-home main border-left border-right px-0" style={{ backgroundColor: "white" }}>

<div className="d-block d-lg-none">
        <GroupsTabs />
      </div>
      {/* Friend Request Section */}
      <div className="friend-request-section mb-5 px-2">
        <h5 className="p-2" >Groups you've joined</h5>
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
                
                />
               
              ) : (
                
                <LargeScreenCard
               
                  key={index}
                  name={profile.name}
                  handle={profile.handle}
                  image={profile.image}
                 
                />
             
              )
            )
          )}
        </div>
      </div>

      

      
    </div>
  );
}

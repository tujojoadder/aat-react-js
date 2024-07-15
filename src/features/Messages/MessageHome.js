import React, { useEffect, useState } from "react";
import "./MessageHome.css";
import { Scrollbars } from "react-custom-scrollbars";
import { useLocation, NavLink } from "react-router-dom";
import SendMessage from "./SendMessages/SendMessage";
import NoUserSelectedToMessage from "./NoUserSelectedToMessage/NoUserSelectedToMessage";
import AllFriendList from "../Friends/AllFriendList/AllFriendList";
import SearchBox from "../home/Components/SearchBox/SearchBox";

export default function MessageHome() {
  const [commentsHeight, setCommentsHeight] = useState("80vh"); // Default height for medium devices
  const [isSmallOrMedium, setIsSmallOrMedium] = useState(window.innerWidth < 992); // Default check for small or medium devices

  // Function to update the height based on window width
  const updateDimensions = () => {
    if (window.innerWidth < 576) {
      setCommentsHeight("73vh"); // Small devices (sm) like mobile phones
    } else {
      setCommentsHeight("81vh"); // Medium devices (md) like tablets and desktops
    }

    setIsSmallOrMedium(window.innerWidth < 992); // Check if the device is small or medium
  };

  // Effect to update dimensions when component mounts and on window resize
  useEffect(() => {
    updateDimensions(); // Initial height and width update

    // Event listener for window resize
    window.addEventListener("resize", updateDimensions);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []); // Empty dependency array ensures effect runs only on mount and unmount

  const [isLargeDevice, setIsLargeDevice] = useState(window.innerWidth >= 992); // State to check if the device is large

  // Effect to check if the window width is larger than 992px when the component mounts
  useEffect(() => {
    setIsLargeDevice(window.innerWidth >= 992);
  }, []); // Empty dependency array ensures this runs only on mount

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
    },
    {
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
    },
    {
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
    },
    {
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
    // Add more profileQuis as needed
  ];

  const location = useLocation();

  return isLargeDevice ? (
    <div className="message-home main  mb-5" style={{ backgroundColor: "white",minHeight:'100vh' }}><NoUserSelectedToMessage /></div>
  ) : (
    <div className="p-0 m-0 main border ">
<SearchBox/>
        <div className="mb-5">
          {profiles.map((profile, index) => {
            const isActive = location.pathname === `/message/${profile.name}`;
            return (
              <NavLink key={index} to={`/message/${profile.name}`} className="text-decoration-none">
                <div className="col-12 mb-2 m-0 p-0">
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
 
    </div>
  );
}

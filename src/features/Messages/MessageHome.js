import React, { useEffect, useState } from "react";
import "./MessageHome.css";
import { Scrollbars } from "react-custom-scrollbars";
import Comment from "../home/Components/Comment/Comment/Comment";
import { useLocation } from "react-router-dom";
import SendMessage from "./SendMessages/SendMessage";
import NoUserSelectedToMessage from "./NoUserSelectedToMessage/NoUserSelectedToMessage";
export default function MessageHome() {
  const [commentsHeight, setCommentsHeight] = useState("80vh"); // Default height for medium devices
  const [isSmallOrMedium, setIsSmallOrMedium] = useState(
    window.innerWidth < 992
  ); // Default check for small or medium devices

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

  

  const [isLargeDevice, setIsLargeDevice] = useState(false); // State to check if the device is large

  useEffect(() => {
    // Check if the window width is larger than 992px when the component mounts
    const initialCheck = window.innerWidth >= 992;
    setIsLargeDevice(initialCheck);
  }, []); // Empty dependency array ensures this runs only on mount



  return isLargeDevice ?(<div><NoUserSelectedToMessage/></div>):(
    
  <div>hello</div>
  );
}

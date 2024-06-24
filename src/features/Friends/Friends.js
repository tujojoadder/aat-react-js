import React from "react";
import { useMediaQuery } from "react-responsive";
import "./.././../all.css";
import "./.././../style.css";
import Home from "../home/Home";
import Homeleft from "../home/Homeleft";
import SmallScreenCard from "./SmallScreenCard/SmallScreenCard";
import LargeScreenCard from "./LargeScreenCard/LargeScreenCard";
import Profile from "../Profile/Profile";

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
    }
    
  ];

  return (
   <Profile/>
  );
}

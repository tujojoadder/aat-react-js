import React, { useState } from "react";
import TextPost from "../home/Components/TextPost/TextPost";
import ImagePost from "../home/Components/ImagePost/ImagePost";
import GroupsTabs from "./GroupsTabs/GroupsTabs";
import {
  NavLink,
  useLocation,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import BPost from "../home/Components/BPost/BPost";

export default function GroupsHome() {
  const [activeTab, setActiveTab] = useState("home"); // Example: 'home', 'profile', etc.

  const tabs = [
    { id: "home", label: "Home" },
    { id: "profile", label: "Profile" },
    { id: "messages", label: "Messages" },
    { id: "notifications", label: "Notifications" },
    { id: "home", label: "Home" },
    { id: "profile", label: "Profile" },
    { id: "messages", label: "Messages" },
    { id: "notifications", label: "Notifications" },
    { id: "home", label: "Home" },
    { id: "profile", label: "Profile" },
    { id: "messages", label: "Messages" },
    { id: "notifications", label: "Notifications" },
    // Add more tabs as needed
  ];

  return (
    <div
      className="friend-home main pt-2  "
      style={{
        backgroundColor: "white",
        marginBottom: "5vh",
        paddingLeft: "0px",
        paddingRight: "0px",
      }}
    >
      <div className="d-block d-lg-none">
        <GroupsTabs />
      </div>
  
  <BPost/>
  <ImagePost/>
  <BPost/>
  <ImagePost/>
  <TextPost/>
  <TextPost/>
  <ImagePost/>
  <TextPost/>
    </div>
  );
}

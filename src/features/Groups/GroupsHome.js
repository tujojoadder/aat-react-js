import React, { useState } from "react";
import TextPost from "../home/Components/TextPost/TextPost";
import BothPost from "../home/Components/BothPost/BothPost";
import ImagePost from "../home/Components/ImagePost/ImagePost";
import GroupsTabs from "./GroupsTabs/GroupsTabs";
import {
  NavLink,
  useLocation,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

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
      className="friend-home main  "
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
      <TextPost />
      <BothPost />
      <ImagePost />
      <TextPost />
      <BothPost />
      <TextPost />
      <BothPost />
      <TextPost />
      <BothPost />
    </div>
  );
}

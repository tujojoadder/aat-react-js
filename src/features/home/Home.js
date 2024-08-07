import React, { useRef, useState, useEffect } from "react";
import "./Home.css";
import HadithIteam from "./Components/HadithItem/HadithIteam";
import "./.././../all.css";
import "./.././../style.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import TextPost from "./Components/TextPost/TextPost";
import ImagePost from "./Components/ImagePost/ImagePost";
import HadithStatus from "./Components/HadithStatus/HadithStatus";
import { Scrollbars } from "react-custom-scrollbars";
import Friends from "../Friends/Friends";
import BPost from "./Components/BPost/BPost";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent";
import MobileMenu from "../MobileMenu/MobileMenu";
import FriendRequestBack from "../Friends/FriendBack/FriendRequestBack/FriendRequestBack";
import FriendSuggestionBack from "../Friends/FriendBack/FriendSuggestionBack/FriendSuggestionBack";
import IChannelCreateBack from "../IChannels/iChannelBack/iChannelCreateBack/IChannelCreateBack";
import HadithDay from "./Components/HadithDay/HadithDay";
import Try from "./Components/Try/Try";
import { useSelector } from "react-redux";



export default function Home() {
  
  return (
    <div
      className="p-0 m-0    home-container main"
      style={{ width: "100%", backgroundColor: "#f8f9fa" }}
    >

      {/* Header for mobile(sm) */}
      <HeaderComponent />
      {/*    Hadith Status */}
      <HadithStatus />

      <div className="center-flex-container flex-item ">
        {/*   <div className="home py-2 border " style={{ marginTop:'-1vh' }}>
          <h1>Home</h1>
        </div> */}
        {/* Create post */}
        <CreatePost />
        {/* Text post */}
        <TextPost />
        <BPost />

        <ImagePost />
        <TextPost />
        <TextPost />
        {/*   ImagePost */}
        <ImagePost />
        <BPost />
        <TextPost />
        <TextPost />
        {/*   ImagePost */}
        <ImagePost />
        <BPost />
      </div>
    </div>
  );
}

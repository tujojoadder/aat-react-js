import React, { useRef, useState, useEffect } from "react";
import "./Home.css";
import HadithIteam from "./Components/HadithItem/HadithIteam";
import "./.././../all.css";
import "./.././../style.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import TextPost from "./Components/TextPost/TextPost";

import ImagePost from "./Components/ImagePost/ImagePost";
import HadithStatus from "./Components/HadithStatus/HadithStatus";
import { Scrollbars } from 'react-custom-scrollbars';
import Friends from "../Friends/Friends";
import BPost from "./Components/BPost/BPost";
export default function Home() {
  return (
    
    <div className="p-0 m-0    home-container main" style={{ width: "100%",backgroundColor:'#f8f9fa' }}>

   {/*    Hadith Status */}
      <HadithStatus />
    
      <div className="center-flex-container flex-item">
        {/* <div className="home py-2">
          <h1>Home</h1>
        </div> */}
        {/* Create post */}
        <CreatePost />
        {/* Text post */}
          <TextPost/>
          <ImagePost/>
          <TextPost/>
          <TextPost/>
        {/*   ImagePost */}
        <ImagePost/>
        <BPost/>
        <TextPost/>
          <TextPost/>
        {/*   ImagePost */}
        <ImagePost/>
        <BPost/>
      </div>
    </div>
  );
}

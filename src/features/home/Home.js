import React, { useRef, useState, useEffect } from "react";
import "./Home.css";
import HadithIteam from "./Components/HadithItem/HadithIteam";
import "./.././../all.css";
import "./.././../style.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import TextPost from "./Components/TextPost/TextPost";
import BothPost from "./Components/BothPost/BothPost";
import ImagePost from "./Components/ImagePost/ImagePost";
import HadithStatus from "./Components/HadithStatus/HadithStatus";
import { Scrollbars } from 'react-custom-scrollbars';
export default function Home() {
  return (
    
    <div className="p-0 m-0   border home-container" style={{ width: "100%",backgroundColor:'#f8f9fa' }}>

   {/*    Hadith Status */}
      <HadithStatus />
      
      <div className="center-flex-container flex-item">
        {/* <div className="home py-2">
          <h1>Home</h1>
        </div> */}
        {/* Create post */}
        <CreatePost />
        {/* Text post */}
        <TextPost />
        {/* Both post */}
        <BothPost />
        {/* Image post */}
        <ImagePost />
        <BothPost />

        <ImagePost />
        <TextPost />
        <TextPost />
        <TextPost />
      </div>
    </div>
  );
}

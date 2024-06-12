import React from "react";
import "./Home.css";
import image from "./logo.jpg";
import image1 from "./logo1.png";
import image2 from "./logo2.png";
import HadithIteam from "./Components/HadithItem/HadithIteam";
import "./.././../all.css";
import "./.././../style.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import TextPost from "./Components/TextPost/TextPost";
import ImagePost from "./Components/ImagePost/ImagePost";
import BothPost from "./Components/BothPost/BothPost";
export default function Home() {
  return (
    <div className="">
      {/* //HadithIteam */}
      <div className="wrapper p-1 ">
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
        <HadithIteam />
      </div>
      {/* //Main Home container */}

      <div class="center-flex-container flex-item">
        {/*  //Home bar */}
        <div class="home">
          <h1>Home</h1>
          <i class="fas fa-magic"></i>
        </div>

        {/* Create Post */}
        <CreatePost />

        {/*  <!-- User Content --> */}

        {/* Test Post */}

        <TextPost />
        {/* Image Post */}
        <ImagePost />
        {/* BoothPost */}
        <BothPost />
        <ImagePost />
      </div>
    </div>
  );
}

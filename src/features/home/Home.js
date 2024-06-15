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
    <div className=" p-0 m-0 border" style={{width:'100%'}}>
      {/* //HadithIteam */}
      <div className="wrapper ml-3 my-2  ">
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
        <div className="home py-2">
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
        <ImagePost />
        <ImagePost />
        <TextPost />
        {/* BoothPost */}
        <BothPost />
        <TextPost />
        <TextPost />
        <TextPost />
        <TextPost />
        {/* Image Post */}
        <ImagePost />
        <TextPost />
        {/* BoothPost */}
        <BothPost />  <TextPost />
        {/* Image Post */}
        <ImagePost />
        <TextPost />
        {/* BoothPost */}
        <BothPost />  <TextPost />
        <BothPost />  <TextPost />
        <BothPost />  <TextPost />
        <BothPost />  <TextPost />
        {/* Image Post */}
        <ImagePost />
        <ImagePost />
        <ImagePost />
        <ImagePost />
        <ImagePost />
        <TextPost />
        {/* BoothPost */}
        <BothPost />  <TextPost />
        {/* Image Post */}
        <ImagePost />
        <TextPost />
        {/* BoothPost */}
        <BothPost />
        
      </div>
    </div>
  );
}

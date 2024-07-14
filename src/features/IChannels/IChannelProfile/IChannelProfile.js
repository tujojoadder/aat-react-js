import React, { useState, useEffect } from "react";
import "./IChannelProfile.css";
import image from "./logo.jpg";
import TextPost from "../../home/Components/TextPost/TextPost";
import ImagePost from "../../home/Components/ImagePost/ImagePost";
import ProfileFriend from "../../Profile/ProfileFriends/ProfileFriend/ProfileFriend";
import ImageContainer from "../../Friends/ImageContainer/ImageContainer";
import { NavLink } from "react-router-dom";
import BPost from "../../home/Components/BPost/BPost";

export default function IChannelProfile() {
  return (
    <div className="header__wrapper m-0 p-0 border">
      <header></header>
      <div className="cols__container">
        <div className="left__col mb-1">
          <div className="img__container">
            <img src={image} alt="Anna Smith" />
            <span></span>
          </div>
          <h2>Anna Smith</h2>
          <p style={{ marginBottom: "7px", marginTop: "-2px" }}>
            anna@example.com
          </p>

          <h6
            style={{ marginBottom: "7px", marginTop: "-2px" }}
            className="ms-2"
          >
            117.2k Follower
          </h6>
        </div>
        <div className="right__col">
          <nav>
            <div className="d-flex justify-content-center justify-content-sm-end">
               
             {/*  Only for admin groups */}
             <NavLink
                      
                      to='/ichannel/{id}/manage'
                      className="text-decoration-none"
                    >
              <div
                className="btn btn-md btn-primary mx-1 d-flex align-items-center"
                style={{ cursor: "pointer" }}
              >
               
                <i class="fa-solid fa-pen"></i>
                <span className="ms-1">Manage</span>
                
              </div>
              </NavLink>
              <div
                className="btn btn-md btn-primary mx-1 d-flex align-items-center"
                style={{ cursor: "pointer" }}
              >
               <i class="fa-solid fa-mosque  "></i> 
                <span className="ms-1">Join Channel</span>
              </div>
              <div
                className="btn btn-md mx-1 me-3 d-flex align-items-center"
                style={{ cursor: "pointer", minWidth: "70px", backgroundColor: '#e4e6eb' }}
              >
                <i className="fa-solid fa-share"></i>
                &nbsp; Share
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Content section */}
      <div className="content-secssion mx-md-2">
        <ul className="nav nav-tabs mt-3">
          <li className="nav-item">
            <a className="nav-link active" href="#post" data-bs-toggle="tab">
              Posts
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#image" data-bs-toggle="tab">
              Photos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#friends" data-bs-toggle="tab">
              Following
            </a>
          </li>
        </ul>

        <div className="tab-content">
          {/* Post Section */}
          <div
            id="post"
            className="post-container-secssion mb-md-4 tab-pane fade show active"
          >
            <BPost />
            <TextPost />
            <ImagePost />
            <BPost />
            <ImagePost />
            <TextPost />
            <BPost />
          </div>

          {/* Image Section */}
          <div
            id="image"
            className="image-container-secssion mb-md-4 px-md-3 pt-3 tab-pane fade"
          >
            <ImageContainer />
          </div>

          {/* Following Section */}
          <div id="friends" className="tab-pane fade w-100">
            <ProfileFriend />
            <ProfileFriend />
            <ProfileFriend />
            <ProfileFriend />
            <ProfileFriend />
            <ProfileFriend />
            <ProfileFriend />
            <ProfileFriend />
            <ProfileFriend />
            <ProfileFriend />
            <ProfileFriend />
          </div>
        </div>
      </div>
    </div>
  );
}

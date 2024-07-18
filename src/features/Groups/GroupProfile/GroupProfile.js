import React, { useState, useEffect } from "react";
import "./GroupProfile.css";
import image from "./logo.jpg";
import TextPost from "../../home/Components/TextPost/TextPost";
import ImagePost from "../../home/Components/ImagePost/ImagePost";
import About from "../../home/Components/About/About";
import ProfileFriend from "../../Profile/ProfileFriends/ProfileFriend/ProfileFriend";
import ImageContainer from "../../Friends/ImageContainer/ImageContainer";
import GroupAbout from "../GroupAbout/GroupAbout";
import { NavLink, useLocation, BrowserRouter, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import BPost from "../../home/Components/BPost/BPost";
import ProfileHomeBack from "../../Profile/ProfileHomeBack/ProfileHomeBack";

export default function GroupProfile() {
  const [currentTab, setCurrentTab] = useState("More");
  const handleTabClick = (tabName) => {
    // Check if the screen size is less than 992px (Bootstrap's large size threshold)
    if (window.innerWidth < 992) {
      if (["People", "About"].includes(tabName)) {
        setCurrentTab(tabName);
      }
    } else {
      if (["About"].includes(tabName)) {
        setCurrentTab(tabName);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      // Get current window width
      const width = window.innerWidth;

      // If the screen width is less than 992px and the currentTab is "More", reset it to "Friends"
      if (width < 992 && currentTab === "More") {
        setCurrentTab("More");
      }

      // If the screen width is 992px or more and the currentTab is "Friends", reset it to "More"
      if (width >= 992 && currentTab === "People") {
        setCurrentTab("More");
      }
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Call handleResize immediately to set the initial state
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentTab]);

  return (
    <div className="header__wrapper m-0 p-0 border">
      <ProfileHomeBack text="Group name" />
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
          <i className="fa-solid fa-eye"></i> <span className="" style={{ fontWeight: 'lighter' }}>Public</span>
          <h7 style={{ marginBottom: "7px", marginTop: "-2px" }} className="ms-2">
            117.2k members
          </h7>
        </div>
        <div className="right__col">
          <nav>
            <div className="d-flex justify-content-center justify-content-sm-end">
              
              
             {/*  Only for admin groups */}
             <NavLink
                      
                      to='/groups/{id}/manage'
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
                <i className="fa-solid fa-users"></i>
                <span className="ms-1">Join Group</span>
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
      <div className="content-secssion mx-2">
        <ul className="nav nav-tabs mt-3">
          <li className="nav-item">
            <a className="nav-link active" href="#post" data-bs-toggle="tab">
              Discussion
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#image" data-bs-toggle="tab">
              Photos
            </a>
          </li>
          <li className="nav-item d-none d-lg-block">
            <a className="nav-link" href="#friends" data-bs-toggle="tab">
              People
            </a>
          </li>

          {/* Dropdown */}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
            >
              {currentTab}
            </a>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item d-lg-none"
                  href="#friends"
                  data-bs-toggle="tab"
                  onClick={() => handleTabClick("People")}
                >
                  People
                </a>
              </li>
              
              <li>
                <a
                  className="dropdown-item"
                  href="#about"
                  data-bs-toggle="tab"
                  onClick={() => handleTabClick("About")}
                >
                  About
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <div className="tab-content">
          {/* Post Section */}
          <div
        
            id="post"
            className="post-container-secssion mb-md-4 tab-pane fade show active"
          >
          <BPost/>
          <ImagePost/>
          <TextPost/>
          <BPost/>
          <ImagePost/>
          <ImagePost/>
          <TextPost/>
          </div>

          {/* Image Section */}
          <div
            id="image"
            className="image-container-secssion mb-md-4 px-md-3 pt-3 tab-pane fade"
          >
            <ImageContainer />
          </div>

          {/* About Section */}
          <div id="about" className="p-3 tab-pane fade">
            <h4 className="ps-2 ">About</h4>
            <GroupAbout />
          </div>
          {/* People Section */}
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

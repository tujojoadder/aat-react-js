import React, { useState, useEffect } from "react";
import "./GroupProfile.css";
import image from "./logo.jpg";
import TextPost from "../../home/Components/TextPost/TextPost";
import BothPost from "../../home/Components/BothPost/BothPost";
import ImagePost from "../../home/Components/ImagePost/ImagePost";
import About from "../../home/Components/About/About";
import ProfileFriend from "../../Profile/ProfileFriends/ProfileFriend/ProfileFriend";
import ImageContainer from "../../Friends/ImageContainer/ImageContainer";
import GroupAbout from "../GroupAbout/GroupAbout";
import { NavLink, useLocation, BrowserRouter, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function GroupProfile() {
  const [currentTab, setCurrentTab] = useState("More");
  const [activeTab, setActiveTab] = useState("post");
  const { id } = useParams();
  const handleTabClick = (tabName, activeTabId) => {
    setCurrentTab(tabName);
    setActiveTab(activeTabId);

  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 992) {
        if (activeTab === "members") {
          setCurrentTab("Members");
        } else {
          setCurrentTab("More");
        }
      } else {
        if (currentTab === "Members") {
          setCurrentTab("More");
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentTab, activeTab]);

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

      <div className="content-secssion mx-2">
        <ul className="nav nav-tabs mt-3">
          <li className="nav-item">
            <a className={`nav-link ${activeTab === "post" ? "active" : ""}`} href="#post" data-bs-toggle="tab" onClick={() => handleTabClick("More", "post")}>
              Discussion
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeTab === "image" ? "active" : ""}`} href="#image" data-bs-toggle="tab" onClick={() => handleTabClick("More", "image")}>
              Media
            </a>
          </li>
          <li className={`nav-item d-none d-lg-block ${activeTab === "members" ? "active" : ""}`}>
            <a className={`nav-link ${activeTab === "members" ? "active" : ""}`} href="#friends" data-bs-toggle="tab" onClick={() => handleTabClick("Members", "members")}>
              Members
            </a>
          </li>
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
                  onClick={() => handleTabClick("Members", "members")}
                >
                  Members
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#about"
                  data-bs-toggle="tab"
                  onClick={() => handleTabClick("About", "about")}
                >
                  About
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <div className="tab-content">
          <div id="post" className={`post-container-secssion mb-md-4 tab-pane fade ${activeTab === "post" ? "show active" : ""}`}>
            <TextPost />
            <BothPost />
            <BothPost />
            <ImagePost />
            <ImagePost />
          </div>

          <div id="image" className={`image-container-secssion mb-md-4 px-md-3 pt-3 tab-pane fade ${activeTab === "image" ? "show active" : ""}`}>
            <ImageContainer />
          </div>

          <div id="about" className={`p-3 tab-pane fade ${activeTab === "about" ? "show active" : ""}`}>
            <h4 className="ps-4 pb-2 ">About</h4>
            <GroupAbout />
          </div>

          <div id="friends" className={`p-md-3 tab-pane fade ${activeTab === "members" ? "show active" : ""}`}>
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

          <div id="follower" className={`p-md-3 tab-pane fade ${activeTab === "follower" ? "show active" : ""}`}>
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

          <div id="following" className={`p-md-3 tab-pane fade ${activeTab === "following" ? "show active" : ""}`}>
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

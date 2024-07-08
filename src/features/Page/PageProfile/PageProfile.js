import React, { useState, useEffect } from "react";
import "./PageProfile.css";
import image from "./logo.jpg";
import TextPost from "../../home/Components/TextPost/TextPost";

import ImagePost from "../../home/Components/ImagePost/ImagePost";
import ProfileFriend from "../../Profile/ProfileFriends/ProfileFriend/ProfileFriend";
import ImageContainer from "../../Friends/ImageContainer/ImageContainer";
import GroupAbout from "../../Groups/GroupAbout/GroupAbout";
import { NavLink } from "react-router-dom";
import About from "../../home/Components/About/About";
import PageAbout from "../PageAbout/PageAbout";
import BPost from "../../home/Components/BPost/BPost";

export default function PageProfile() {
  const [currentTab, setCurrentTab] = useState("More");
  const handleTabClick = (tabName) => {
    // Check if the screen size is less than 992px (Bootstrap's large size threshold)
    if (window.innerWidth < 992) {
      if (["Friends", "About"].includes(tabName)) {
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

      if (width < 992 && currentTab === "More") {
        setCurrentTab("More");
      }

      // If the screen width is 992px or more and the currentTab is "Friends", reset it to "More"
      if (width >= 992 && currentTab === "Friends") {
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
            117.2k Likes
          </h6>
        </div>
        <div className="right__col">
          <nav>
            <div className="d-flex justify-content-center justify-content-sm-end">

           {/*  massage and Manage will stay for admin */}

          {/*   Manage */}
              <NavLink
                to="/page/{id}/manage"
                className="text-decoration-none"
              >
                <div
                  className="btn btn-md btn-primary mx-1 d-flex align-items-center mt-1"
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa-solid fa-pen"></i>
                  <span className="ms-1">Manage</span>
                </div>
              </NavLink>

              {/* Message Button */}
              <div
                className="btn-sm btn-primary rounded-circle d-flex align-items-center justify-content-center mx-1 p-2"
                style={{ cursor: "pointer", height: "35px", marginTop: "2px" }}
              >
                <i className="fa-solid fa-envelope fs-5"></i>
              </div>
              {/*   Like */}
              <div
                className="btn btn-md btn-primary mx-1 d-flex align-items-center px-3"
                style={{ cursor: "pointer" }}
              >
                <i class="fa-solid fa-thumbs-up"></i>
                <span className="ms-1">Like</span>
              </div>

              {/*   Share */}
              <div
                className="btn btn-md mx-1 me-3 d-flex align-items-center"
                style={{
                  cursor: "pointer",
                  minWidth: "70px",
                  backgroundColor: "#e4e6eb",
                }}
              >
                <i className="fa-solid fa-share"></i> &nbsp; Share
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
          <li className="nav-item d-none d-lg-block">
            <a className="nav-link" href="#friends" data-bs-toggle="tab">
              Following
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
                  onClick={() => handleTabClick("Friends")}
                >
                  Following
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
            <TextPost/>
            <ImagePost/>
            <BPost/>
            <ImagePost/>
            <TextPost/>
            <BPost/>
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
            <h4 className="ps-3 pb-2 ">About</h4>
            <PageAbout />
          </div>
          {/* Friends Section */}
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

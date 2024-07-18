import React, { useState, useEffect } from "react";
import "./Profile.css";
import image from "./logo.jpg";
import TextPost from "../home/Components/TextPost/TextPost";
import { NavLink } from "react-router-dom";

import ImagePost from "../home/Components/ImagePost/ImagePost";
import ImageContainer from "../Friends/ImageContainer/ImageContainer";
import About from "../home/Components/About/About";
import ProfileFriend from "./ProfileFriends/ProfileFriend/ProfileFriend";
import BPost from "../home/Components/BPost/BPost";
import ProfileHomeBack from "./ProfileHomeBack/ProfileHomeBack";

export default function Profile() {
  const [currentTab, setCurrentTab] = useState("More");
  const handleTabClick = (tabName) => {
    // Check if the screen size is less than 992px (Bootstrap's large size threshold)
    if (window.innerWidth < 992) {
      if (["Friends", "Follower", "Following", "About"].includes(tabName)) {
        setCurrentTab(tabName);
      }
    } else {
      if (["Follower", "Following", "About"].includes(tabName)) {
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
    <div className="header__wrapper m-0 p-0 border" >
      <ProfileHomeBack text="Profile name"/>
      
      <header></header>
      <div className="cols__container">
        <div className="left__col">
          <div className="img__container">
            <img src={image} alt="Anna Smith" />
            <span></span>
          </div>
          <h2>Anna Smith</h2>
          <p style={{ marginBottom: "7px", marginTop: "-2px" }}>
            anna@example.com
          </p>
        </div>
        <div className="right__col">
          <nav>
            <div className="d-flex justify-content-center justify-content-sm-end">
              {/*  massage and Manage will stay for admin */}

              {/*   Manage */}
              <NavLink to="/profile/manage" className="text-decoration-none">
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
              {/*   Add friend */}
              <div
                className="btn btn-md btn-primary mx-1 d-flex align-items-center px-2"
                style={{ cursor: "pointer" }}
              >
               <i className="fa-solid fa-user-plus text-white"></i>
                <span className="ms-1">Add friend</span>
              </div>

              {/*   Follow */}
              <div
                className="btn btn-md btn-primary mx-1 d-flex align-items-center px-2 me-3"
                style={{ cursor: "pointer" }}
              >

                <span className="ms-1">Follow</span>
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
              Friends
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
                  Friends
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#follower"
                  data-bs-toggle="tab"
                  onClick={() => handleTabClick("Follower")}
                >
                  Follower
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#following"
                  data-bs-toggle="tab"
                  onClick={() => handleTabClick("Following")}
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
            <TextPost/>
            <BPost/>
            <ImagePost/>
            <BPost/>
            <TextPost/>
            <BPost/>
            <ImagePost/>
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
            <h4 className="ps-2 ">About</h4>
            <About />
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

          {/* Follower Section */}
          <div id="follower" className="p-md-3 tab-pane fade">
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
          {/* Following Section */}
          <div id="following" className="p-md-3 tab-pane fade">
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

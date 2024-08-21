import React, { useState, useEffect, useRef } from "react";
import "./MyProfile.css";
import image from "./logo.jpg";
import TextPost from "../../home/Components/TextPost/TextPost";
import { NavLink, useParams } from "react-router-dom";

import ImagePost from "../../home/Components/ImagePost/ImagePost";
import ImageContainer from "../../Friends/ImageContainer/ImageContainer";
import About from "../../home/Components/About/About";
import ProfileFriend from "../ProfileFriends/ProfileFriend/ProfileFriend";
import BPost from "../../home/Components/BPost/BPost";
import ProfileHomeBack from "../ProfileHomeBack/ProfileHomeBack";
import { useSelector } from "react-redux";
import MyProfilePost from "./MyProfilePost/MyProfilePost";
import CustomScrollBar from "../../CustomScrollBar/CustomScrollBar";
import MyProfileImageContainer from "./MyProfileImageContainer/MyProfileImageContainer";
import MyProfileFriendsContainer from "./MyProfileFriendsContainer/MyProfileFriendsContainer";
import MyProfileFollowerContainer from "./MyProfileFollowerContainer/MyProfileFollowerContainer";
import MyProfileFollowingContainer from "./MyProfileFollowingContainer/MyProfileFollowingContainer";

export default function MyProfile() {


  const scrollRef = useRef(null);
  /*  // Using useSelector to retrieve the profile details from Redux state */
  const {
    profile_picture,
    user_fname,
    user_lname,
    email,
    identifier,
    cover_photo,
  } = useSelector((state) => ({
    profile_picture: state.home.profile_picture,
    user_fname: state.home.user_fname,
    user_lname: state.home.user_lname,
    email: state.home.email,
    identifier: state.home.identifier,
    cover_photo: state.home.cover_photo,
  }));
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

  // Inline style for the background image
  const backgroundImageStyle = {
    backgroundImage: `url(http://127.0.0.1:8000/${cover_photo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "calc(100px + 15vw)",
  };

  return (
    <div
      className="friend-home main border-start border-end mb-1 m-0 p-0"
      style={{ backgroundColor: "white", minHeight: "100vh" }}
    >
        <div ref={scrollRef} className="header__wrapper m-0 p-0" style={{ overflowY: 'scroll', height: '100vh' }}>
        <div style={backgroundImageStyle}>
          <ProfileHomeBack text="My account" />
        </div>
        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              <img
                src={`http://127.0.0.1:8000/${profile_picture}`}
                alt={"Profile Image"}
              />

              <span></span>
            </div>
            <h2>
              {" "}
              {user_fname} {user_lname}
            </h2>

            <p style={{ marginBottom: "7px", marginTop: "-2px" }}>
              @{identifier}
            </p>
          </div>
          <div className="right__col">
            <nav>
              <div className="d-flex justify-content-center justify-content-sm-end">
                {/*  massage and Manage will stay for admin */}

                {/*   Manage */}
                <NavLink to="/profile/manage" className="text-decoration-none">
                  <div
                    className="btn btn-md btn-primary mx-5 d-flex align-items-center mt-1"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fa-solid fa-pen"></i>
                    <span className="ms-1">Manage</span>
                  </div>
                </NavLink>
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

             <MyProfilePost/> 
            </div>

            {/* Image Section */}
            <div
              id="image"
              className="image-container-secssion mb-md-4 px-md-3 pt-3 tab-pane fade"
            >
              <MyProfileImageContainer/>
            </div>

            {/* About Section */}
            <div id="about" className="p-3 tab-pane fade">
              <h4 className="ps-2 ">About</h4>
              <About />
            </div>
            {/* Friends Section */}
            <div id="friends" className="tab-pane fade w-100">
              <MyProfileFriendsContainer />
            </div>

            {/* Follower Section */}
            <div id="follower" className="p-md-3 tab-pane fade">
              <MyProfileFollowerContainer/>
            </div>
            {/* Following Section */}
            <div id="following" className="p-md-3 tab-pane fade">
              <MyProfileFollowingContainer/>
            </div>
          </div>
        </div>
      </div>
      <CustomScrollBar scrollRef={scrollRef} /> {/* Include CustomScrollBar */}

    </div>

  );
}

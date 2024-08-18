import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Profile.css";
import image from "./logo.jpg";
import TextPost from "../home/Components/TextPost/TextPost";
import { NavLink, useParams } from "react-router-dom";
import ImagePost from "../home/Components/ImagePost/ImagePost";
import ImageContainer from "../Friends/ImageContainer/ImageContainer";
import About from "../home/Components/About/About";
import ProfileFriend from "./ProfileFriends/ProfileFriend/ProfileFriend";
import BPost from "../home/Components/BPost/BPost";
import ProfileHomeBack from "./ProfileHomeBack/ProfileHomeBack";
import { useGetUserDetailsQuery } from "../../services/friendsApi";
import ProfileSkeleton from "./ProfileSkeleton/ProfileSkeleton";

export default function Profile() {
  const { id } = useParams();
  const { data: profileData, isFetching, isError, refetch } = useGetUserDetailsQuery(id);
  const [currentTab, setCurrentTab] = useState("More");

  const handleTabClick = (tabName) => {
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
      const width = window.innerWidth;
      if (width < 992 && currentTab === "More") {
        setCurrentTab("More");
      }
      if (width >= 992 && currentTab === "Friends") {
        setCurrentTab("More");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentTab]);

  if (isFetching) {
    return (
      <ProfileSkeleton/>
    );
  }

  if (isError ) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="friend-home main border-start border-end mb-1 m-0 p-0" style={{ backgroundColor: "white", minHeight: '100vh' }}>
      <div className="header__wrapper m-0 p-0 ">
        <ProfileHomeBack text={profileData?.data?.name || "Profile name"} />
        <header></header>
        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              <img src={profileData?.data?.profileImage || image} alt={profileData?.data?.name || "Profile Image"} />
            </div>
            <h2>{profileData?.data?.name || "Anna Smith"}</h2>
            <p>{profileData?.data?.identifier || "Identifier"}</p>
          </div>
          <div className="right__col">
            <nav>
              <div className="d-flex justify-content-center justify-content-sm-end">
                <NavLink to="/profile/manage" className="text-decoration-none">
                  <div className="btn btn-md btn-primary mx-1 d-flex align-items-center mt-1" style={{ cursor: "pointer" }}>
                    <i className="fa-solid fa-pen"></i>
                    <span className="ms-1">Manage</span>
                  </div>
                </NavLink>
                <div className="btn-sm btn-primary rounded-circle d-flex align-items-center justify-content-center mx-1 p-2" style={{ cursor: "pointer", height: "35px", marginTop: "2px" }}>
                  <i className="fa-solid fa-envelope fs-5"></i>
                </div>
                <div className="btn btn-md btn-primary mx-1 d-flex align-items-center px-2" style={{ cursor: "pointer" }}>
                  <i className="fa-solid fa-user-plus text-white"></i>
                  <span className="ms-1">Add friend</span>
                </div>
                <div className="btn btn-md btn-primary mx-1 d-flex align-items-center px-2 me-3" style={{ cursor: "pointer" }}>
                  <span className="ms-1">Follow</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="content-secssion mx-2">
          <ul className="nav nav-tabs mt-3">
            <li className="nav-item">
              <a className="nav-link active" href="#post" data-bs-toggle="tab">Posts</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#image" data-bs-toggle="tab">Photos</a>
            </li>
            <li className="nav-item d-none d-lg-block">
              <a className="nav-link" href="#friends" data-bs-toggle="tab">Friends</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                {currentTab}
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item d-lg-none" href="#friends" data-bs-toggle="tab" onClick={() => handleTabClick("Friends")}>Friends</a></li>
                <li><a className="dropdown-item" href="#follower" data-bs-toggle="tab" onClick={() => handleTabClick("Follower")}>Follower</a></li>
                <li><a className="dropdown-item" href="#following" data-bs-toggle="tab" onClick={() => handleTabClick("Following")}>Following</a></li>
                <li><a className="dropdown-item" href="#about" data-bs-toggle="tab" onClick={() => handleTabClick("About")}>About</a></li>
              </ul>
            </li>
          </ul>
          <div className="tab-content">
            <div id="post" className="post-container-secssion mb-md-4 tab-pane fade show active">
            {/*   <TextPost /> */}
            </div>
            <div id="image" className="image-container-secssion mb-md-4 px-md-3 pt-3 tab-pane fade">
              <ImageContainer />
            </div>
            <div id="about" className="p-3 tab-pane fade">
              <h4 className="ps-2 ">About</h4>
              <About />
            </div>
            <div id="friends" className="tab-pane fade w-100">
              <ProfileFriend />
            </div>
            <div id="follower" className="p-md-3 tab-pane fade">
              <ProfileFriend />
            </div>
            <div id="following" className="p-md-3 tab-pane fade">
              <ProfileFriend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

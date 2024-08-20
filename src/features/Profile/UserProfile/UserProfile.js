import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./UserProfile.css";
import { NavLink, useParams } from "react-router-dom";

import { useInView } from "react-intersection-observer";

import ImageContainer from "../../Friends/ImageContainer/ImageContainer";
import About from "../../home/Components/About/About";
import ProfileHomeBack from "../ProfileHomeBack/ProfileHomeBack";
import { useGetSpecificUserPostQuery } from "../../../services/profileApi";
import BPost from "../../home/Components/BPost/BPost";
import TextPost from "../../home/Components/TextPost/TextPost";
import Spinner from "../../Spinner/Spinner";
import ImagePost from "../../home/Components/ImagePost/ImagePost";
import { useGetUserDetailsQuery } from "../../../services/friendsApi";
import ProfileSkeleton from "../ProfileSkeleton/ProfileSkeleton";
import FriendsContainer from "../FriendsContainer/FriendsContainer";
import FollowerContainer from "../FollowerContainer/FollowerContainer";
import FollowingContainer from "../FollowingContainer/FollowingContainer";

export default function UserProfile() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  // Get reference and visibility state
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const {
    data: useGetSpecificUserPostQueryData,
    isFetching: useGetSpecificUserPostQueryIsFetching,
    isError: useGetSpecificUserPostQueryIsError,
    isSuccess: useGetSpecificUserPostQueryIsSuccess,
  } = useGetSpecificUserPostQuery({ page, id });

  if (useGetSpecificUserPostQueryIsFetching) {
    console.log("post" + useGetSpecificUserPostQueryData);
  }
  // Effect to process fetched data
  useEffect(() => {
    if (
      useGetSpecificUserPostQueryIsSuccess &&
      useGetSpecificUserPostQueryData?.data
    ) {
      if (useGetSpecificUserPostQueryData.data.length === 0) {
        setHasMorePosts(false);
      } else {
        const newPosts = useGetSpecificUserPostQueryData.data.filter(
          (newPost) =>
            !allPosts.some((post) => post.post_id === newPost.post_id)
        );
        if (newPosts.length > 0) {
          setAllPosts((prevPosts) => [...prevPosts, ...newPosts]);
        }
      }
    }
  }, [, useGetSpecificUserPostQueryData, useGetSpecificUserPostQueryIsSuccess]);

  // Effect to handle infinite scroll logic
  useEffect(() => {
    if (
      inView &&
      !useGetSpecificUserPostQueryIsFetching &&
      !useGetSpecificUserPostQueryIsError &&
      hasMorePosts &&
      useGetSpecificUserPostQueryIsSuccess
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [
    inView,
    useGetSpecificUserPostQueryIsFetching,
    useGetSpecificUserPostQueryIsError,
    hasMorePosts,
    useGetSpecificUserPostQueryIsSuccess,
  ]);

  //getting profile top data (name ,images,identifire)
  const {
    data: profileData,
    isFetching,
    isError,
    refetch,
  } = useGetUserDetailsQuery(id);
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
    return <ProfileSkeleton />;
  }

  if (isError) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  // Inline style for the background image
  const backgroundImageStyle = {
    backgroundImage: `url(http://127.0.0.1:8000/${profileData?.data?.cover_photo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "calc(100px + 15vw)",
  };

  return (
    <div
      className="friend-home main border-start border-end mb-1 m-0 p-0"
      style={{ backgroundColor: "white", minHeight: "100vh" }}
    >
      <div className="header__wrapper m-0 p-0">
        <div style={backgroundImageStyle}>
          <ProfileHomeBack
            text={`${profileData?.data?.user_fname} ${profileData?.data?.user_lname}`}
          />{" "}
        </div>

        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              <img
                src={`http://127.0.0.1:8000/${profileData?.data?.profile_picture}`}
                alt={profileData?.data?.name || "Profile Image"}
              />
            </div>
            <h2>
              {profileData?.data?.user_fname} {profileData?.data?.user_lname}
            </h2>
            <p>@{profileData?.data?.identifier}</p>
          </div>
          <div className="right__col">
            <nav>
              <div className="d-flex justify-content-center justify-content-sm-end">
                <div
                  className="btn-sm btn-primary rounded-circle d-flex align-items-center justify-content-center mx-1 p-2"
                  style={{
                    cursor: "pointer",
                    height: "35px",
                    marginTop: "2px",
                  }}
                >
                  <i className="fa-solid fa-envelope fs-5"></i>
                </div>
                <div
                  className="btn btn-md btn-primary mx-1 d-flex align-items-center px-2"
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa-solid fa-user-plus text-white"></i>
                  <span className="ms-1">Add friend</span>
                </div>
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

        {/* Horizontal Nav Menu */}
        <ul className="nav nav-tabs justify-content-center">
          <li className="nav-item">
            <NavLink
              exact
              to="/profile/post"
              className="nav-link"
              activeClassName="active"
            >
              Posts
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/profile/${id}/photos`}
              className="nav-link"
              activeClassName="active"
            >
              {" "}
              Photos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/profile/friends"
              className="nav-link"
              activeClassName="active"
            >
              Friends
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/profile/followers"
              className="nav-link"
              activeClassName="active"
            >
              Followers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/profile/following"
              className="nav-link"
              activeClassName="active"
            >
              Following
            </NavLink>
          </li>
        </ul>

        <div className="content-secssion mx-2">
          <ImageContainer id={} />
        </div>
      </div>
    </div>
  );
}

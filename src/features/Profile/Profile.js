import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ProfileSkeleton from "./ProfileSkeleton/ProfileSkeleton";
import ProfileHomeBack from "./ProfileHomeBack/ProfileHomeBack";
import ProfilePost from "./ProfilePost/ProfilePost";
import {
  useGetFriendStateQuery,
  useGetUserDetailsQuery,
} from "../../services/friendsApi";
import ImageContainer from "../Friends/ImageContainer/ImageContainer";
import FriendsContainer from "./FriendsContainer/FriendsContainer";
import FollowerContainer from "./FollowerContainer/FollowerContainer";
import FollowingContainer from "./FollowingContainer/FollowingContainer";
import About from "../home/Components/About/About";
import CustomScrollBar from "../CustomScrollBar/CustomScrollBar";
import SmallScreenBack from "../SmallScreenBack/SmallScreenBack";
import LargeScreenBack from "../LargeScreenBack/LargeScreenBack";
import LargeScreenProfile from "../LargeScreenBack/LargeScreenProfileBack";
import { NavLink } from "react-router-dom";
import MidScreenBack from "../SmallScreenBack/MidScreenBack";
import ProfileButton from "./ProfileButton/ProfileButton";
export default function Profile() {
  const { id } = useParams();

  const {
    data: friendState,
    error: friendError,
    isLoading: friendLoading,
    isSuccess: friendSuccess,
  } = useGetFriendStateQuery(id);

  if (friendSuccess) {
    console.log(friendState.friend_state);
  }

  const scrollRef = useRef(null);
  const [currentTab, setCurrentTab] = useState("More");

  /* // Create a unique key for storing the scroll position
  const localStorageKey = `scrollPosition_${id}`;

  // Restore scroll position from localStorage
  useEffect(() => {
    const storedScrollPosition = localStorage.getItem(localStorageKey);
    if (scrollRef.current && storedScrollPosition) {
      scrollRef.current.scrollTop = parseInt(storedScrollPosition, 10);
    }

    // Clean up scroll event listener
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [id]);

  // Handle scroll event and save scroll position
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      console.log(`Current scroll position: ${scrollTop}`); // Log scroll position
      localStorage.setItem(localStorageKey, scrollTop);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    // Clean up scroll event listener on unmount
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [id]); */

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

  // Tabs handling function
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
  // Fetch user profile data
  const {
    data: profileData,
    isFetching,
    isError,
    isSuccess,
  } = useGetUserDetailsQuery(id);
  if (isSuccess) {
    console.log(profileData);
  }
  // Handle loading state
  if (isFetching) return <ProfileSkeleton />;

  // Handle error state
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

  // Background styling for the profile cover
  const backgroundImageStyle = {
    backgroundImage: `url(${profileData?.data?.cover_photo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "calc(100px + 15vw)",
    backgroundColor: "lightgrey", // Added for debugging
  };

  return (
    <>
      {isSuccess && friendSuccess && (
        <div
          className="friend-home main border-start border-end mb-1 m-0 p-0"
          style={{ backgroundColor: "white", minHeight: "100vh" }}
        >
          <div
            ref={scrollRef}
            className="header__wrapper m-0 p-0"
            style={{ overflowY: "scroll", overflowX:'hidden' }}
          >
            {/*    Back buttons */}
            <SmallScreenBack
              text={`${profileData?.data?.user_fname} ${profileData?.data?.user_lname}`}
            />
            <MidScreenBack
              text={`${profileData?.data?.user_fname} ${profileData?.data?.user_lname}`}
            />
            <LargeScreenProfile
              text={`${profileData?.data?.user_fname} ${profileData?.data?.user_lname}`}
            />
            <div style={backgroundImageStyle}></div>

            {/* Header of profile */}
            <div className="cols__container">
              <div className="left__col">
                <div className="img__container">
                  <img
                    src={`${profileData?.data?.profile_picture}`}
                    style={{ backgroundColor: "lightgray" }}
                    alt="Profile"
                  />
                </div>
                <h2>
                  {profileData?.data?.user_fname}{" "}
                  {profileData?.data?.user_lname}
                </h2>
                <p>@{profileData?.data?.identifier}</p>
              </div>
              <div className="right__col">
                <nav>
                  <div className="d-flex justify-content-center justify-content-sm-end">
                    {/*  massage and Manage will stay for admin */}

                    <div className="mx-4">
                      <ProfileButton
                        type={friendState.friend_state}
                        user_id={id}
                      />
                    </div>
                  </div>
                </nav>
              </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mt-3 mx-2 ">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  href="#post"
                  data-bs-toggle="tab"
                >
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

            {/* Tab Content */}
            <div className="tab-content p-3 px-0">
              {/* Posts Tab Content */}
              <div className="tab-pane fade show active" id="post">
                <h5 className="ms-4 mb-4" color="#65676b">
                  Posts
                </h5>
                <ProfilePost userId={id} />
              </div>

              {/* Photos Tab Content */}
              <div className="tab-pane fade" id="image">
                <h5 className="ms-4 mb-1" color="#65676b">
                  Photos
                </h5>

                <ImageContainer userId={id} />
              </div>

              {/* Friends Tab Content */}
              <div className="tab-pane fade" id="friends">
                <h5 className="ms-4 mb-1" color="#65676b">
                  Friends
                </h5>

                <FriendsContainer userId={id} />
              </div>

              {/* Follower Tab Content */}
              <div className="tab-pane fade" id="follower">
                <h5 className="ms-4 mb-1" color="#65676b">
                  Follower
                </h5>

                <FollowerContainer userId={id} />
              </div>

              {/* Following Tab Content */}
              <div className="tab-pane fade" id="following">
                <h5 className="ms-4 mb-1" color="#65676b">
                  Following
                </h5>

                <FollowingContainer userId={id} />
              </div>

              {/* About Tab Content */}
              <div className="tab-pane fade" id="about">
                <h5 className="ms-4 mb-1" color="#65676b">
                  About
                </h5>
                <About userId={id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

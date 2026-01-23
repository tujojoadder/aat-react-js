import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ProfileSkeleton from "./ProfileSkeleton/ProfileSkeleton";
import ProfileHomeBack from "./ProfileHomeBack/ProfileHomeBack";
import ProfilePost from "./ProfilePost/ProfilePost";
import { useGetUserDetailsQuery } from "../../services/friendsApi";
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
import FollowButton from "./ProfileButton/FollowButton";
import LockScreen from "./LockProfile/LockProfile";
export default function Profile() {
  const { id } = useParams();

  const scrollRef = useRef(null);
  const [currentTab, setCurrentTab] = useState("More");
  const [activeTab, setActiveTab] = useState("post"); // Set default active tab to 'post'

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
    backgroundImage: `url(${process.env.REACT_APP_LARAVEL_URL}/${profileData?.data?.cover_photo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "calc(100px + 15vw)",
    backgroundColor: "lightgrey", // Added for debugging
  };

  console.log("friend :" + profileData?.data?.friend_state);
  console.log("privacy :" + profileData?.data?.privacy_setting);

  return (
    <>
      {isSuccess && (
        <div
          className="friend-home main border-start border-end mb-1 m-0 p-0"
          style={{ backgroundColor: "white", minHeight: "100vh" }}
        >
          <div
            ref={scrollRef}
            className="header__wrapper m-0 p-0"
            style={{ overflowY: "scroll", overflowX: "hidden" }}
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
                    src={`${process.env.REACT_APP_LARAVEL_URL}/${profileData?.data?.profile_picture}`}
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

                    <div className="">
                      <ProfileButton
                        type={profileData?.data?.friend_state}
                        user_id={id}
                      />
                    </div>

                    {/* follow button only if user is not locked his profile */}
                    {profileData?.data?.privacy_setting !== "locked" ? (
                      <div className="ml-3">
                        <FollowButton
                          userId={id}
                          is_following={profileData?.data?.is_following}
                        />
                      </div>
                    ) : null}
                    <div className="mr-4 "></div>
                  </div>
                </nav>
              </div>
            </div>

            {/* Lock screen or tabs */}

            {profileData?.data?.friend_state !== "friend" &&
              profileData?.data?.privacy_setting === "locked" ? (
              <LockScreen />
            ) : (
              <>
                <ul className="nav nav-tabs mt-3 mx-2 ">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "post" ? "active" : ""}`}
                      onClick={() => setActiveTab("post")}
                      type="button"
                    >
                      Posts
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "image" ? "active" : ""}`}
                      onClick={() => setActiveTab("image")}
                      type="button"
                    >
                      Photos
                    </button>
                  </li>
                  <li className="nav-item d-none d-lg-block">
                    <button
                      className={`nav-link ${activeTab === "friends" ? "active" : ""}`}
                      onClick={() => setActiveTab("friends")}
                      type="button"
                    >
                      Friends
                    </button>
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
                        <button
                          className="dropdown-item d-lg-none"
                          onClick={() => {
                            handleTabClick("Friends");
                            setActiveTab("friends");
                          }}
                          type="button"
                        >
                          Friends
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            handleTabClick("Follower");
                            setActiveTab("follower");
                          }}
                          type="button"
                        >
                          Follower
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            handleTabClick("Following");
                            setActiveTab("following");
                          }}
                          type="button"
                        >
                          Following
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            handleTabClick("About");
                            setActiveTab("about");
                          }}
                          type="button"
                        >
                          About
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content p-3 px-0">
                  {/* Posts Tab Content */}
                  <div className={`tab-pane fade ${activeTab === "post" ? "show active" : ""}`} id="post">
                    {activeTab === "post" && (
                      <>
                        <h5 className="ms-4 mb-4" color="#65676b">
                          Posts
                        </h5>
                        <ProfilePost userId={id} />
                      </>
                    )}
                  </div>

                  {/* Photos Tab Content */}
                  <div className={`tab-pane fade ${activeTab === "image" ? "show active" : ""}`} id="image">
                    {activeTab === "image" && (
                      <>
                        <h5 className="ms-4 mb-1" color="#65676b">
                          Photos
                        </h5>
                        <ImageContainer userId={id} />
                      </>
                    )}
                  </div>

                  {/* Friends Tab Content */}
                  <div className={`tab-pane fade ${activeTab === "friends" ? "show active" : ""}`} id="friends">
                    {activeTab === "friends" && (
                      <>
                        <h5 className="ms-4 mb-1" color="#65676b">
                          Friends
                        </h5>
                        <FriendsContainer userId={id} />
                      </>
                    )}
                  </div>

                  {/* Follower Tab Content */}
                  <div className={`tab-pane fade ${activeTab === "follower" ? "show active" : ""}`} id="follower">
                    {activeTab === "follower" && (
                      <>
                        <h5 className="ms-4 mb-1" color="#65676b">
                          Follower
                        </h5>
                        <FollowerContainer userId={id} />
                      </>
                    )}
                  </div>

                  {/* Following Tab Content */}
                  <div className={`tab-pane fade ${activeTab === "following" ? "show active" : ""}`} id="following">
                    {activeTab === "following" && (
                      <>
                        <h5 className="ms-4 mb-1" color="#65676b">
                          Following
                        </h5>
                        <FollowingContainer userId={id} />
                      </>
                    )}
                  </div>

                  {/* About Tab Content */}
                  <div className={`tab-pane fade ${activeTab === "about" ? "show active" : ""}`} id="about">
                    {activeTab === "about" && (
                      <>
                        <h5 className="ms-4 mb-1" color="#65676b">
                          About
                        </h5>
                        <About userId={id} />
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

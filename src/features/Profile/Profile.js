import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProfileSkeleton from "./ProfileSkeleton/ProfileSkeleton";
import ProfileHomeBack from "./ProfileHomeBack/ProfileHomeBack";
import ProfilePost from "./ProfilePost/ProfilePost";
import { useGetUserDetailsQuery } from "../../services/friendsApi";
import ImageContainer from "../Friends/ImageContainer/ImageContainer";
import FriendsContainer from "./FriendsContainer/FriendsContainer";
import FollowerContainer from "./FollowerContainer/FollowerContainer";
import FollowingContainer from "./FollowingContainer/FollowingContainer";
import About from "../home/Components/About/About";

export default function Profile() {
  const { id } = useParams();
  const location = useLocation(); // Get the current location

  // Move useState and useEffect here
  const [currentTab, setCurrentTab] = useState("More");

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

  // Fetch user profile data
  const { data: profileData, isFetching, isError } = useGetUserDetailsQuery(id);

  // Handle loading state
  if (isFetching) return <ProfileSkeleton />;

  // Handle error state
  if (isError) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  // Background styling for the profile cover
  const backgroundImageStyle = {
    backgroundImage: `url(http://127.0.0.1:8000/${profileData?.data?.cover_photo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "calc(100px + 15vw)",
  };

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

  return (
    <div className="friend-home main border-start border-end mb-1 m-0 p-0" style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <div className="header__wrapper m-0 p-0">
        <div style={backgroundImageStyle}>
          <ProfileHomeBack text={`${profileData?.data?.user_fname} ${profileData?.data?.user_lname}`} />
        </div>

        {/* Header of profile */}
        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              <img src={`http://127.0.0.1:8000/${profileData?.data?.profile_picture}`} alt="Profile" />
            </div>
            <h2>{profileData?.data?.user_fname} {profileData?.data?.user_lname}</h2>
            <p>@{profileData?.data?.identifier}</p>
          </div>
        </div>

        {/* Tabs */}
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
        <div className="tab-content p-3">
          {/* Posts Tab Content */}
          <div className="tab-pane fade show active" id="post">
            <h4>Posts</h4>
            
            {/* Example post content */}
            <ProfilePost userId={id} />
          </div>

          {/* Photos Tab Content */}
          <div className="tab-pane fade" id="image">
            <h4>Photos</h4>
            <ImageContainer userId={id} />
          </div>

          {/* Friends Tab Content */}
          <div className="tab-pane fade" id="friends">
            <h4>Friends</h4>
            <FriendsContainer  userId={id}  />
          </div>

          {/* Follower Tab Content */}
          <div className="tab-pane fade" id="follower">
            <h4>Follower</h4>
           <FollowerContainer  userId={id}   />
          </div>

          {/* Following Tab Content */}
          <div className="tab-pane fade" id="following">
            <h4>Following</h4>
           <FollowingContainer  userId={id}  />
          </div>

          {/* About Tab Content */}
          <div className="tab-pane fade" id="about">
            <h4>About</h4>
           <About/>
          </div>
        </div>
      </div>
    </div>
  );
}

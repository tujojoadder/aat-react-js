import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Profile.css";
import { NavLink, useParams } from "react-router-dom";
import ImageContainer from "../Friends/ImageContainer/ImageContainer";
import About from "../home/Components/About/About";
import ProfileFriend from "./ProfileFriends/ProfileFriend/ProfileFriend";
import ProfileHomeBack from "./ProfileHomeBack/ProfileHomeBack";
import { useGetUserDetailsQuery } from "../../services/friendsApi";
import ProfileSkeleton from "./ProfileSkeleton/ProfileSkeleton";
import { useGetSpecificUserPostQuery } from "../../services/profileApi";
import { useInView } from "react-intersection-observer";
import BPost from "../home/Components/BPost/BPost";
import ImagePost from "../home/Components/ImagePost/ImagePost";
import TextPost from "../home/Components/TextPost/TextPost";
import Spinner from "../Spinner/Spinner";
import FriendsContainer from "./FriendsContainer/FriendsContainer";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("post");
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  // Get reference and visibility state
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });
  useEffect(() => {
    setPage(1);
    setAllPosts([]);
    setHasMorePosts(true);
  }, [id]);
  // Fetch data using dynamic query
  const {
    data: useGetSpecificUserPostQueryData,
    isFetching: useGetSpecificUserPostQueryIsFetching,
    isError: useGetSpecificUserPostQueryIsError,
    isSuccess: useGetSpecificUserPostQueryIsSuccess,
  } = useGetSpecificUserPostQuery({ page, id });


  if (useGetSpecificUserPostQueryIsFetching) {
    console.log("post"+useGetSpecificUserPostQueryData);
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
  }, [
    ,
    useGetSpecificUserPostQueryData,
    useGetSpecificUserPostQueryIsSuccess,
    id,
  ]);





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



  function handlePhotoTabClick() {
    setActiveTab('photo');
  }

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
        <div className="content-secssion mx-2">
          <ul className="nav nav-tabs mt-3">
            <li className="nav-item">
              <a className="nav-link active" href="#post" data-bs-toggle="tab">
                Posts
              </a>
            </li>
            <li className="nav-item" onClick={handlePhotoTabClick}>
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
          <div className="tab-content">
            <div
              id="post"
              className="post-container-secssion mb-md-4 tab-pane fade show active"
            >
              <div className="post-wrapper">
                {allPosts.map((post) => (
                  <div key={post.post_id} className="post-container">
                    {post.text_post && !post.image_post && (
                      <TextPost post={post} />
                    )}
                    {!post.text_post && post.image_post && (
                      <ImagePost post={post} />
                    )}
                    {post.text_post && post.image_post && <BPost post={post} />}
                  </div>
                ))}

{/* Scroller Spinner */}
                <div
                  ref={ref}
                  className="loading-trigger"
                  style={{minHeight:'40px'}}
                >
                  {useGetSpecificUserPostQueryIsFetching && <Spinner />}
                </div>
              </div>
            </div>
            <div
              id="image"
              className="image-container-secssion mb-md-4 px-md-3 pt-3 tab-pane fade"
            >

{activeTab=='photo'?(<ImageContainer id={id} />):(<p>No photo</p>)}
             
              
            </div>
            <div id="about" className="p-3 tab-pane fade">
              <h4 className="ps-2 ">About</h4>
              <About />
            </div>
            <div id="friends" className="tab-pane fade w-100">
              <FriendsContainer id={id} />



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

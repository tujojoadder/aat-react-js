
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import LargeScreenProfile from "../../LargeScreenBack/LargeScreenProfileBack";
import PageAbout from "../PageAbout/PageAbout";

import { NavLink } from "react-router-dom";
import { useGetGroupDetailsQuery } from "../../../services/groupsApi";
import ProfileSkeleton from "../../Profile/ProfileSkeleton/ProfileSkeleton";
import ProfileHomeBack from "../../Profile/ProfileHomeBack/ProfileHomeBack";
import CustomScrollBar from "../../CustomScrollBar/CustomScrollBar";
import SmallScreenBack from "../../SmallScreenBack/SmallScreenBack";
import LargeScreenBack from "../../LargeScreenBack/LargeScreenBack";
import LargeScreenProfileBack from "../../LargeScreenBack/LargeScreenProfileBack";
import MidScreenBack from "../../SmallScreenBack/MidScreenBack";
import { setGroupAudience, setGroupDetails } from "../../home/HomeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetPageDetailsQuery } from "../../../services/pagesApi";
import PagePost from "../PagePost/PagePost";
import PagePhoto from "../PagePhoto/PagePhoto";
import PageMember from "../PageMember/PageMember";
export default function PageProfile() {
  const groupUpdate = useSelector((state) => state.home.groupUpdate); // Track group updates

  const { id } = useParams();
  const scrollRef = useRef(null);
  const [currentTab, setCurrentTab] = useState("More");

  const dispatch = useDispatch();

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
      if (width >= 992 && currentTab === "Followers") {
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
      if (["Followers", "About"].includes(tabName)) {
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
    data: pageData,
    isFetching,
    isError,
    isSuccess,
    refetch,
  } = useGetPageDetailsQuery(id);

  useEffect(() => {
    refetch();
  }, [groupUpdate]);

  // Dispatch actions to store audience and group details in Redux
  useEffect(() => {
    if (isSuccess) {
      console.log(pageData);

      // Dispatch actions to update Redux state
      dispatch(setGroupAudience(pageData.data.audience));
      dispatch(setGroupDetails(pageData.data.group_details));
    }
  }, [isSuccess, pageData, dispatch]);

  useEffect(() => {
    refetch();
  }, [groupUpdate]);

  if (isSuccess) {
    console.log(pageData);
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
    backgroundImage: `url(${pageData?.data?.page_cover})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "calc(100px + 15vw)",
    backgroundColor: "lightgrey", // Added for debugging
  };

  return (
    <div
      className="friend-home main border-start border-end mb-1 m-0 p-0"
      style={{ backgroundColor: "white", minHeight: "100vh" }}
    >
      <div ref={scrollRef} className="header__wrapper m-0 p-0">
        {/*    Back buttons */}
        <SmallScreenBack text={`${pageData?.data?.page_name}`} />
        <MidScreenBack text={`${pageData?.data?.page_name}`} />
        <LargeScreenProfile text={`${pageData?.data?.page_name}`} />
        <div style={backgroundImageStyle}></div>

        {/* Header of profile */}
        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              <img
                src={`${pageData?.data?.page_picture}`}
                style={{ backgroundColor: "lightgray" }}
                alt="Profile"
              />
            </div>
            <h2>{pageData?.data?.page_name}</h2>
            <p>@{pageData?.data?.identifier}</p>
            
            <h7
              style={{ marginBottom: "7px", marginTop: "-2px" }}
              className="ms-2"
            >
              117.2k Likes
            </h7>
          </div>
          <div className="right__col">
            <nav>
              <div className="d-flex justify-content-center justify-content-sm-end">
                {pageData.data.isAdmin && pageData.data.page_id && (
                  <NavLink
                    to={`/groups/${pageData.data.page_id}/manage`}
                    className="text-decoration-none"
                  >
                    <div
                      className="btn btn-md btn-primary mx-4 d-flex align-items-center"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa-solid fa-pen"></i>
                      <span className="ms-1">Manage</span>
                    </div>
                  </NavLink>
                )}

<div className="right__col">
          <nav>
            <div className="d-flex justify-content-center justify-content-sm-end">
              {/*  massage and Manage will stay for admin */}

           

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
                <i className="fa-solid fa-thumbs-up"></i>
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
            <a className="nav-link" href="#follower" data-bs-toggle="tab">
            Followers
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
                  href="#follower"
                  data-bs-toggle="tab"
                  onClick={() => handleTabClick("Followers")}
                >
                  Followers
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
        <div className="tab-content p-3 px-0 ">
          {/* Post Tab Content */}
          <div className="tab-pane bg-white fade show active" id="post">
            <h5 className="ms-4 mb-4" color="#65676b">
              Posts
            </h5>

            <PagePost pageId={id} joinStatus={pageData.data.joinStatus} />
          </div>

          {/* Photos Tab Content */}
          <div className="tab-pane fade bg-white" id="image">
            <h5 className="ms-4 mb-1" color="#65676b">
              Photos
            </h5>
            <PagePhoto pageId={id} />
          </div>

          {/* Followers Tab Content */}
          <div className="tab-pane fade bg-white" id="follower">
            <h5 className="ms-4 mb-1" color="#65676b">
            Followers
            </h5>

            <PageMember pageId={id} />
          </div>

          {/* About Tab Content */}
          <div className="tab-pane fade bg-white" id="about">
            <h5 className="ms-4 mb-1" color="#65676b">
              About
            </h5>
            <PageAbout/>
          </div>
        </div>
      </div>
    </div>
  );
}

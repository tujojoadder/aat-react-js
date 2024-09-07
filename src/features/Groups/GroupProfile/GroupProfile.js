import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import LargeScreenProfile from "../../LargeScreenBack/LargeScreenProfileBack";

import { NavLink } from "react-router-dom";
import { useGetGroupDetailsQuery } from "../../../services/groupsApi";
import ProfileSkeleton from "../../Profile/ProfileSkeleton/ProfileSkeleton";
import ProfileHomeBack from "../../Profile/ProfileHomeBack/ProfileHomeBack";
import CustomScrollBar from "../../CustomScrollBar/CustomScrollBar";
import SmallScreenBack from "../../SmallScreenBack/SmallScreenBack";
import LargeScreenBack from "../../LargeScreenBack/LargeScreenBack";
import LargeScreenProfileBack from "../../LargeScreenBack/LargeScreenProfileBack";
import MidScreenBack from "../../SmallScreenBack/MidScreenBack";
import GroupDiscussion from "./GroupDiscussion/GroupDiscussion";
import GroupPhoto from "./GroupPhoto/GroupPhoto";
import GroupMember from "./GroupMember/GroupMember";
import { setGroupAudience, setGroupDetails } from "../../home/HomeSlice";
import { useDispatch, useSelector } from "react-redux";
import GroupAbout from "../GroupAbout/GroupAbout";
export default function GroupProfile() {
  const groupUpdate = useSelector((state) => state.home.groupUpdate);

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
      if (width >= 992 && currentTab === "People") {
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
      if (["People", "Follower", "Following", "About"].includes(tabName)) {
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
    data: groupData,
    isFetching,
    isError,
    isSuccess,
    refetch
  } = useGetGroupDetailsQuery(id);


  useEffect(() => {
   refetch();
  }, [groupUpdate]);


  // Dispatch actions to store audience and group details in Redux
  useEffect(() => {
    if (isSuccess) {
      console.log(groupData);

      // Dispatch actions to update Redux state
      dispatch(setGroupAudience(groupData.data.audience));
      dispatch(setGroupDetails(groupData.data.group_details));
    }
  }, [isSuccess, groupData, dispatch]);

  if (isSuccess) {
    console.log(groupData);
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
    backgroundImage: `url(${groupData?.data?.group_cover})`,
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
      <div
        ref={scrollRef}
        className="header__wrapper m-0 p-0"
        style={{ overflowY: "scroll", height: "100vh" }}
      >
        {/*    Back buttons */}
        <SmallScreenBack text={`${groupData?.data?.group_name}`} />
        <MidScreenBack text={`${groupData?.data?.group_name}`} />
        <LargeScreenProfile text={`${groupData?.data?.group_name}`} />
        <div style={backgroundImageStyle}></div>

        {/* Header of profile */}
        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              <img
                src={`${groupData?.data?.group_picture}`}
                style={{ backgroundColor: "lightgray" }}
                alt="Profile"
              />
            </div>
            <h2>{groupData?.data?.group_name}</h2>
            <p>@{groupData?.data?.identifier}</p>
            <i className="fa-solid fa-eye"></i>{" "}
            <span className="" style={{ fontWeight: "lighter" }}>
              {groupData?.data?.audience}
            </span>
            <h7
              style={{ marginBottom: "7px", marginTop: "-2px" }}
              className="ms-2"
            >
              117.2k members
            </h7>
          </div>
          <div className="right__col">
            <nav>
              <div className="d-flex justify-content-center justify-content-sm-end">
                {groupData.data.isAdmin && groupData.data.group_id && (
                  <NavLink
                    to={`/groups/${groupData.data.group_id}/manage`}
                    className="text-decoration-none"
                  >
                    <div
                      className="btn btn-md btn-primary mx-1 d-flex align-items-center"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa-solid fa-pen"></i>
                      <span className="ms-1">Manage</span>
                    </div>
                  </NavLink>
                )}

                {!groupData.data.isAdmin && (
                  <div
                    className="btn btn-md btn-primary mx-1 d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fa-solid fa-users"></i>
                    <span className="ms-1">Join Group</span>
                  </div>
                )}

                <div
                  className="btn btn-md mx-1 me-3 d-flex align-items-center"
                  style={{
                    cursor: "pointer",
                    minWidth: "70px",
                    backgroundColor: "#e4e6eb",
                  }}
                >
                  <i className="fa-solid fa-share"></i>
                  &nbsp; Share
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
              href="#discussion"
              data-bs-toggle="tab"
            >
              Discussions
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#image" data-bs-toggle="tab">
              Photos
            </a>
          </li>
          <li className="nav-item d-none d-lg-block">
            <a className="nav-link" href="#people" data-bs-toggle="tab">
              People
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
                  href="#people"
                  data-bs-toggle="tab"
                  onClick={() => handleTabClick("People")}
                >
                  People
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
          {/* Discussion Tab Content */}
          <div className="tab-pane bg-white fade show active" id="discussion">
            <h5 className="ms-4 mb-4" color="#65676b">
              Discussion
            </h5>

            <GroupDiscussion groupId={id} />
          </div>

          {/* Photos Tab Content */}
          <div className="tab-pane fade bg-white" id="image">
            <h5 className="ms-4 mb-1" color="#65676b">
              Photos
            </h5>
            <GroupPhoto groupId={id} />
          </div>

          {/* People Tab Content */}
          <div className="tab-pane fade bg-white" id="people">
            <h5 className="ms-4 mb-1" color="#65676b">
              People
            </h5>

            <GroupMember groupId={id} />
          </div>

          {/* About Tab Content */}
          <div className="tab-pane fade bg-white" id="about">
            <h5 className="ms-4 mb-1" color="#65676b">
              About
            </h5>
            <GroupAbout />
          </div>
        </div>
      </div>
    </div>
  );
}

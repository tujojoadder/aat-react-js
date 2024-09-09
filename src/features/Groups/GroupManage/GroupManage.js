import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import ApprovalTextPost from "../ApprovalPostCard/ApprovalTextPost";
import ApprovalImagePost from "../ApprovalPostCard/ApprovalImagePost";
import ApprovalBothPost from "../ApprovalPostCard/ApprovalBothPost";
import GroupMembers from "../ApprovalPostCard/GroupMembers";
import SmallScreenBack from "../../SmallScreenBack/SmallScreenBack";
import MidScreenBack from "../../SmallScreenBack/MidScreenBack";
import LargeScreenProfile from "../../LargeScreenBack/LargeScreenProfileBack";
import { useGetGroupDetailsQuery } from "../../../services/groupsApi";
import GroupOptions from "./GroupOptions/GroupOptions";
import GroupManageMember from "./GroupManageMember/GroupManageMember";
import ProfileSkeleton from "../../Profile/ProfileSkeleton/ProfileSkeleton";

export default function GroupManage() {
  const { id } = useParams();
  const scrollRef = useRef(null);
  const [currentTab, setCurrentTab] = useState("Options");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);

  // Fetch group details
  const { data: groupData, isFetching, isError, isSuccess } = useGetGroupDetailsQuery(id);

  // Handle screen resize to adjust tabs visibility
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1200);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle tab click
  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
  };

  // Check for loading or error state
  if (isFetching) return <ProfileSkeleton />;
  
  if (isError || !groupData?.data?.isAdmin) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
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
  };

  const isPublicGroup = groupData?.data?.audience === "public";

  return (
    <div className="friend-home main border-start border-end mb-1 m-0 p-0" style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <div ref={scrollRef} className="header__wrapper m-0 p-0" >
        {/* Back buttons */}
        <SmallScreenBack text={`Manage ${groupData?.data?.group_name}`} />
        <MidScreenBack text={`Manage ${groupData?.data?.group_name}`} />
        <LargeScreenProfile text={`Manage ${groupData?.data?.group_name}`} />
        <div style={backgroundImageStyle}></div>

        {/* Header of profile */}
        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              <img src={`${groupData?.data?.group_picture}`} style={{ backgroundColor: "lightgray" }} alt="Group" />
            </div>
            <h2>{groupData?.data?.group_name}</h2>
            <p>@{groupData?.data?.identifier}</p>
            <i className="fa-solid fa-eye me-1"></i>
            <span style={{ fontWeight: "lighter" }}>{groupData?.data?.audience}</span>
            <h7 style={{ marginBottom: "7px", marginTop: "-2px" }} className="ms-2">117.2k members</h7>
          </div>
          <div className="right__col">
            <nav>
              {/* Navigation buttons can be added here if needed */}
            </nav>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mt-3 mx-2">
          {!isPublicGroup && (
            <li className="nav-item">
              <a className={`nav-link ${currentTab === "Post" ? "active" : ""}`} href="#post" data-bs-toggle="tab">
                Approval
              </a>
            </li>
          )}
          <li className="nav-item">
            <a className={`nav-link ${currentTab === "Join Requests" ? "active" : ""}`} href="#join-requests" data-bs-toggle="tab">
              Join Requests
            </a>
          </li>
          {!isSmallScreen && !isPublicGroup && (
            <>
              <li className="nav-item">
                <a className={`nav-link ${currentTab === "Options" ? "active" : ""}`} href="#options" data-bs-toggle="tab">
                  Options
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${currentTab === "Members" ? "active" : ""}`} href="#members" data-bs-toggle="tab">
                  Members
                </a>
              </li>
            </>
          )}
          {isSmallScreen && (
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="moreTab" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                More
              </a>
              <ul className="dropdown-menu" aria-labelledby="moreTab">
                {!isPublicGroup && (
                  <li>
                    <a className="dropdown-item" href="#options" data-bs-toggle="tab" onClick={() => handleTabClick("Options")}>
                      Options
                    </a>
                  </li>
                )}
                <li>
                  <a className="dropdown-item" href="#members" data-bs-toggle="tab" onClick={() => handleTabClick("Members")}>
                    Members
                  </a>
                </li>
              </ul>
            </li>
          )}
        </ul>

        {/* Tab Content */}
        <div className="tab-content p-3 px-0">
          {!isPublicGroup && (
            <div id="post" className={`tab-pane fade ${currentTab === "Post" ? "show active" : ""}`}>
              <ApprovalTextPost />
              <ApprovalImagePost />
              <ApprovalBothPost />
            </div>
          )}
          <div id="options" className={`tab-pane mx-2 fade ${currentTab === "Options" ? "show active" : ""}`}>
            <GroupOptions groupId={id} groupName={groupData?.data?.group_name} groupDetails={groupData?.data?.group_details} />
          </div>
          <div id="members" className={`tab-pane fade ${currentTab === "Members" ? "show active" : ""}`}>
            <GroupManageMember groupId={id} />
          </div>
          <div id="join-requests" className={`tab-pane fade ${currentTab === "Join Requests" ? "show active" : ""}`}>
            <h1>Join Requests</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

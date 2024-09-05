import React, { useEffect, useRef } from "react";
import "./GroupManage.css";
import image from "./logo.jpg";
import ApprovalTextPost from "../ApprovalPostCard/ApprovalTextPost";
import ApprovalImagePost from "../ApprovalPostCard/ApprovalImagePost";
import ApprovalBothPost from "../ApprovalPostCard/ApprovalBothPost";
import GroupMembers from "../ApprovalPostCard/GroupMembers";
import ProfileHomeBack from "../../Profile/ProfileHomeBack/ProfileHomeBack";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetGroupDetailsQuery } from "../../../services/groupsApi";
import SmallScreenBack from "../../SmallScreenBack/SmallScreenBack";
import MidScreenBack from "../../SmallScreenBack/MidScreenBack";
import LargeScreenProfile from "../../LargeScreenBack/LargeScreenProfileBack";
import ProfileSkeleton from "../../Profile/ProfileSkeleton/ProfileSkeleton";
export default function GroupManage() {
  const { id } = useParams();
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  // Fetch user profile data
  const { data: groupData, isFetching, isError, isSuccess } = useGetGroupDetailsQuery(id);

  if (isSuccess) {
    console.log(groupData);
  }

  // Handle loading state
  if (isFetching) return <ProfileSkeleton />;

  // Handle error state
  if (isError || !groupData.data.isAdmin) {
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
    backgroundColor: "lightgrey", // Added for debugging
  };

  const profiles = [
    {
      name: "MarkRockwell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    // ... more profiles
  ];

  // Determine the active tab based on the group audience
  const isPublicGroup = groupData?.data?.audience === "public";
  const defaultActiveTab = isPublicGroup ? "options" : "post";

  return (
    <div className="friend-home main border-start border-end mb-1 m-0 p-0" style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <div ref={scrollRef} className="header__wrapper m-0 p-0" style={{ overflowY: "scroll", height: "100vh" }}>
        {/* Back buttons */}
        <SmallScreenBack text={`Manage ${groupData?.data?.group_name}`} />
        <MidScreenBack text={`Manage ${groupData?.data?.group_name}`} />
        <LargeScreenProfile text={`Manage ${groupData?.data?.group_name}`} />
        <div style={backgroundImageStyle}></div>

        {/* Header of profile */}
        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              <img src={`${groupData?.data?.group_picture}`} style={{ backgroundColor: "lightgray" }} alt="Profile" />
            </div>
            <h2>{groupData?.data?.group_name}</h2>
            <p>@{groupData?.data?.identifier}</p>
            <i className="fa-solid fa-eye"></i>{" "}
            <span style={{ fontWeight: "lighter" }}>
              {groupData?.data?.audience}
            </span>
            <h7 style={{ marginBottom: "7px", marginTop: "-2px" }} className="ms-2">
              117.2k members
            </h7>
          </div>
          <div className="right__col">
            <nav>
              {/* Navigation buttons can be added here if needed */}
            </nav>
          </div>
        </div>

        <div className="content-secssion mx-2">
          <ul className="nav nav-tabs mt-3">
            {!isPublicGroup && (
              <li className="nav-item">
                <a className={`nav-link ${defaultActiveTab === "post" ? "active" : ""}`} href="#post" data-bs-toggle="tab">Post Approval</a>
              </li>
            )}
            <li className="nav-item">
              <a className={`nav-link ${defaultActiveTab === "options" ? "active" : ""}`} href="#options" data-bs-toggle="tab">Options</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#members" data-bs-toggle="tab">Members</a>
            </li>
          </ul>

          <div className="tab-content">
            {!isPublicGroup && (
              <div id="post" className={`mx-2 post-container-secssion mb-md-4 tab-pane fade ${defaultActiveTab === "post" ? "show active" : ""}`}>
                <ApprovalTextPost />
                <ApprovalImagePost />
                <ApprovalBothPost />
              </div>
            )}

            <div id="options" className={`p-md-3 tab-pane fade ${defaultActiveTab === "options" ? "show active" : ""} pb-5`}>
              <div className="vertical-menu mb-5">
                <a href="#" className="col-sm-12 col-md-6"><i className="fa-solid fa-image me-2"></i> Change cover photo</a>
                <a href="#" className="col-sm-12 col-md-6"><i className="fa-solid fa-align-left me-2"></i> Change description</a>
                <a href="#" className="col-sm-12 col-md-6"><i className="fa-solid fa-pen me-2"></i> Change group name</a>
                <a href="#" className="col-sm-12 col-md-6"><i className="fa-solid fa-id-badge me-2"></i> Change identifier</a>
              </div>
            </div>

            <div id="members" className="p-md-3 tab-pane fade">
              {profiles.map((profile, index) => (
                <div className="col-12 mb-2" key={index}>
                  <GroupMembers
                    name={profile.name}
                    handle={profile.handle}
                    image={profile.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

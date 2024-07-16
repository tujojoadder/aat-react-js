import React from "react";
import "./GroupManage.css";
import image from "./logo.jpg";
import ApprovalTextPost from "../ApprovalPostCard/ApprovalTextPost";
import ApprovalImagePost from "../ApprovalPostCard/ApprovalImagePost";
import ApprovalBothPost from "../ApprovalPostCard/ApprovalBothPost";
import GroupMembers from "../ApprovalPostCard/GroupMembers";

export default function GroupManage() {
  const profiles = [
    {
      name: "MarkRockwell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "MarkRockwell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "MarkRockwell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "MarkRockwell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "MarkRockwell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    // ... more profiles
  ];

  return (
    <div className="header__wrapper m-0 p-0 border pb-4" style={{ minHeight: '100vh' }}>
      <header></header>
      <div className="cols__container">
        <div className="left__col mb-1">
          <div className="img__container">
            <img src={image} alt="Anna Smith" />
            <span></span>
          </div>
          <h2>Anna Smith</h2>
          <p style={{ marginBottom: "7px", marginTop: "-2px" }}>anna@example.com</p>
          <i className="fa-solid fa-eye"></i> <span className="" style={{ fontWeight: 'lighter' }}>Public</span>
          <h7 style={{ marginBottom: "7px", marginTop: "-2px" }} className="ms-2">117.2k members</h7>
        </div>
        <div className="right__col">
          <nav>
            {/* Navigation buttons can be added here if needed */}
          </nav>
        </div>
      </div>

      <div className="content-secssion mx-2">
        <ul className="nav nav-tabs mt-3">
          <li className="nav-item">
            <a className="nav-link active" href="#post" data-bs-toggle="tab">Post Approval</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#options" data-bs-toggle="tab">Options</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#members" data-bs-toggle="tab">Members</a>
          </li>
        </ul>

        <div className="tab-content">
          <div id="post" className="mx-2 post-container-secssion mb-md-4 tab-pane fade show active">
            <ApprovalTextPost />
            <ApprovalImagePost />
            <ApprovalBothPost />
          </div>

          <div id="options" className="p-md-3 tab-pane fade pb-5">
            <div className="vertical-menu  mb-5">
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
  );
}

import React from "react";
import "./PageManage.css";
import image from "./logo.jpg";
import GroupMembers from "../../Groups/ApprovalPostCard/GroupMembers";
import MakePageAdmin from "./MakePageAdmin";
import { NavLink, BrowserRouter, Route, Routes } from "react-router-dom";

export default function PageManage() {
  const profiles = [
    {
      name: "Mark Rockwell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "Mark Rockwell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "Mark Rockwell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "Mark Rockwell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    {
      name: "Mark Rockwell",
      handle: "@mark_rockwell",
      image: "https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg",
    },
    // ... more profiles
  ];

  return (
    <div className="header__wrapper friend-home main border mb-5 p-0 m-0" style={{ minHeight: '100vh' }}>
      <header></header>
      <div className="cols__container">
        <div className="left__col mb-1">
          <div className="img__container">
            <img src={image} alt="Anna Smith" />
            <span></span>
          </div>
          <h2>Anna Smith</h2>
          <p style={{ marginBottom: "7px", marginTop: "-2px" }}>
            anna@example.com
          </p>
          <h6
            style={{ marginBottom: "7px", marginTop: "-2px" }}
            className="ms-2"
          >
            117.2k Likes
          </h6>
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
            <a className="nav-link active" href="#options" data-bs-toggle="tab">
              Options
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#members" data-bs-toggle="tab">
              Make Admin
            </a>
          </li>
        </ul>

        <div className="tab-content">
        <div id="options" className="image-container-secssion mb-md-4 px-md-3 pt-3 tab-pane fade show active">
  <div className="vertical-menu" >
    <a href="#" className="col-sm-12 col-md-6">
      <i className="fa-solid fa-image me-2"></i> Change cover photo
    </a>
    <a href="#" className="col-sm-12 col-md-6">
      <i className="fa-solid fa-user me-2"></i> Change Profile Picture
    </a>
  
    <a href="#" className="col-sm-12 col-md-6">
      <i className="fa-solid fa-id-card me-2"></i> Change identifier
    </a>

    <a href="#" className="col-sm-12 col-md-6">
    <NavLink to="/page/update" className="custom-link">   <i className="fa-solid fa-info-circle me-2"></i> Change Basic Information
    </NavLink> </a>
 
  </div>
</div>


          <div id="members" className="p-md-3 tab-pane fade">
           <div className="text-section p-1 ps-4">
            <h4>Your Friends</h4>
           </div>
            {profiles.map((profile, index) => {
              return (
                <div className="col-12 mb-2" key={index}>
                  <MakePageAdmin
                    name={profile.name}
                    handle={profile.handle}
                    image={profile.image}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

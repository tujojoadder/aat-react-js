import React from "react";
import "./IChannelsManage.css";
import image from "./logo.jpg";
import { NavLink } from "react-router-dom";

export default function IChannelsManage() {
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
          <p style={{ marginBottom: "7px", marginTop: "-2px" }}>
            anna@example.com
          </p>
          <h6
            style={{ marginBottom: "7px", marginTop: "-2px" }}
            className="ms-2"
          >
            117.2k Follower
          </h6>
        </div>
        <div className="right__col">
          <nav>
            {/* Navigation buttons can be added here if needed */}
          </nav>
        </div>
      </div>

      <div className="content-section">
        <div className="image-container-section mb-md-4 px-md-3 pt-3">
          <div className="vertical-menu">
            <a href="#" className="menu-item">
              <i className="fa-solid fa-image me-2"></i> Change cover photo
            </a>
            <a href="#" className="menu-item">
              <i className="fa-solid fa-user me-2"></i> Change Profile Picture
            </a>
            <a href="#" className="menu-item">
              <i className="fa-solid fa-id-card me-2"></i> Change identifier
            </a>

            <a href="#" className="menu-item">
            <i className="fa-solid fa-info-circle me-2"></i>  Change Basic Information
            </a>
           
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "./Profile.css";
import image from "./logo.jpg";
import TextPost from "../home/Components/TextPost/TextPost";
import BothPost from "../home/Components/BothPost/BothPost";
import ImagePost from "../home/Components/ImagePost/ImagePost";
import ImageContainer from "../ImageContainer/ImageContainer";
import About from "../home/Components/About/About";

export default function Profile() {
  const [currentTab, setCurrentTab] = useState("More");

  const handleTabClick = (tabName) => {
    // Only change the dropdown text if the tab is from the dropdown menu
    if (["Post", "Images", "About"].includes(tabName)) {
      setCurrentTab(tabName);
    }
  };

  return (
    <div className="header__wrapper m-0 p-0">
      <header></header>
      <div className="cols__container">
        <div className="left__col">
          <div className="img__container">
            <img src={image} alt="Anna Smith" />
            <span></span>
          </div>
          <h2>Anna Smith</h2>
          <p style={{ marginBottom: "7px", marginTop: "-2px" }}>
            anna@example.com
          </p>
        </div>
        <div className="right__col">
          <nav>
            <div className="d-flex justify-content-center justify-content-sm-end">
              {/* Message Button */}
              <div
                className="btn-sm btn-primary rounded-circle d-flex align-items-center justify-content-center mx-1"
                style={{ cursor: "pointer", height: "35px", marginTop: "2px" }}
              >
                <i className="fa-solid fa-message text-white"></i>
              </div>

              {/* Add Friend Button */}
              <div
                className="btn btn-md btn-primary mx-1 d-flex align-items-center"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-user-plus text-white"></i>
                <span className="ms-1">Add Friend</span>
              </div>

              {/* Follow Button */}
              <div
                className="btn btn-md btn-info mx-1 d-flex align-items-center"
                style={{ cursor: "pointer", minWidth: "70px" }}
              >
                Follow
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Content section */}
      <div className="content-secssion">
        <ul className="nav nav-tabs mt-3">
          <li className="nav-item">
            <a
              className="nav-link active"
              href="#post"
              data-bs-toggle="tab"
            >
              Post
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#image"
              data-bs-toggle="tab"
            >
              Images
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#about"
              data-bs-toggle="tab"
            >
              About
            </a>
          </li>
          {/* Dropdown */}
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
                  className="dropdown-item"
                  href="#post"
                  data-bs-toggle="tab"
                  onClick={() => handleTabClick("Post")}
                >
                  Post
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#image"
                  data-bs-toggle="tab"
                  onClick={() => handleTabClick("Images")}
                >
                  Images
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
          {/* Post Section */}
          <div
            id="post"
            className="post-container-secssion mb-md-4 tab-pane fade show active"
          >
            <TextPost />
            <BothPost />
            <TextPost />
            <BothPost />
            <TextPost />
            <BothPost />
            <TextPost />
            <BothPost />
            <ImagePost />
            <ImagePost />
          </div>

          <div
            id="image"
            className="image-container-secssion mb-md-4 px-md-3 pt-3 tab-pane fade"
          >
            
            <ImageContainer />
          </div>

          <div id="about" className="p-3 tab-pane fade">
            <h4 className="ps-2">About</h4>
            <About />
          </div>
        </div>
      </div>
    </div>
  );
}

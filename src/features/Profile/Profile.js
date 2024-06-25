import React from "react";
import "./Profile.css";
import image from "./logo.jpg";
import TextPost from "../home/Components/TextPost/TextPost";
import BothPost from "../home/Components/BothPost/BothPost";
import ImagePost from "../home/Components/ImagePost/ImagePost";
import ImageContainer from "../ImageContainer/ImageContainer";
export default function Profile() {
  return (
    <div class="header__wrapper m-0 p-0 mt-sm-5 mt-md-0" >
      <header></header>
      <div class="cols__container">
        <div class="left__col">
          <div class="img__container">
            <img src={image} alt="Anna Smith" />
            <span></span>
          </div>
          <h2>Anna Smith</h2>

          <p style={{ marginBottom: "7px", marginTop: "-2px" }}>
            anna@example.com
          </p>
        </div>
        <div class="right__col">
          <nav>
            <div className="d-flex justify-content-center justify-content-sm-end">
              {/* Message Button */}
              <div
                className="btn-sm   btn-primary rounded-circle d-flex align-items-center justify-content-center mx-1"
                style={{ cursor: "pointer", height: "35px", marginTop: "2px" }}
              >
                <i className="fa-solid fa-message text-white "></i>
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

      {/*    Content secssion */}
      <div className="content-secssion ">
        <ul class="nav nav-tabs  mt-3">
          <li class="nav-item">
            <a class="nav-link active" href="#post" data-toggle="tab">
              Post
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#image" data-toggle="tab">
              Images
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#about" data-toggle="tab">
              About
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link ">More</a>
          </li>
        </ul>

        <div className="tab-content ">
          {/* Post Section */}
          <div id="post" className="post-container-secssion mb-md-4  tab-pane fade show active">
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

          <div id="image"  className="image-container-secssion mb-md-4 px-md-3 pt-3  tab-pane fade">
            <ImageContainer />
          </div>
          <div id="about" className="p-3 tab-pane fade">
            <p>
              3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              optio beatae necessitatibus veniam obcaecati, fugiat non quisquam.
              Consequatur itaque tenetur minima quo, nisi dolorem in facere illo
              vel at doloremque!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

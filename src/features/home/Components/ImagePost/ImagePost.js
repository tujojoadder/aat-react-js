import React from "react";
import image from "./logo1.jpg";
export default function ImagePost() {
  return (
    <div class="posts ">
      <div class="user-pics">
        <img src={image} alt="user1" />
      </div>
      <div class="user-content-box ">
        <div className="user-names" style={{ marginTop: "2px" }}>
          <div className="name-column">
            <h1 className="full-name m-0 p-0">Turjo Joadder </h1>
            <p className="user-name m-0 p-0">@eric_alvareeric</p>
          </div>
          <p className="time ms-3" style={{ marginTop: "18px" }}>
            {" "}
            2hrs
          </p>
        </div>

        <div class="user-content ">
          <img
            style={{ Width: "100%", maxHeight: "65vh" }}
            src={image}
            alt="content1"
          />
        </div>
        <div className="content-icons ">
          <i
            className="far fa-comment blue ps-md-4"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {" "}
            109
          </i>

          <i className="fa-regular fa-thumbs-down ps-md-3"> 536</i>

          <i className="far fa-heart red ps-md-3"> 1.6k</i>
          <i class="fa-solid fa-gear ps-md-3"></i>
        </div>
      </div>
    </div>
  );
}

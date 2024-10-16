import React, { useEffect, useState } from "react";
import image from "./logo.jpg";

export default function CommentedImage() {
  return (
    <div className="posts " style={{borderBottom:'3px solid blue'}}>
      <div className="user-pics">
        <img src={image} alt="user1" />
      </div>
      <div className="user-content-box ">
        <div className="user-names" style={{ marginTop: "2px" }}>
          <div className="name-column">
            <h1 className="full-name m-0 p-0">Turjo Joadder </h1>
            <p className="user-name m-0 p-0">@eric_alvareeric</p>
          </div>
          <p className="time me-4" style={{ marginTop: "18px" }}>
            {" "}
            2hrs
          </p>
        </div>

        <div className="user-content  " style={{ marginTop: "-5px" }}>
          <img
            style={{ Width: "100%", maxHeight: "65vh" }}
            src={image}
            alt="content1"
          />
        </div>
        <div className="content-icons  px-2 ">
          <i
            className=" far fa-heart red  "
            data-bs-toggle="modal"
            data-bs-target="#imageModal"
          >
            {" "}
            109
          </i>

          <i className="fa-regular fa-thumbs-down ps-md-3"> 536</i>

          <i className="ps-md-3 far fa-comment blue "> 1.6k</i>
          <i className="fa-solid fa-chevron-up ps-md-3 pe-4"></i>
        </div>
      </div>
    </div>
  );
}

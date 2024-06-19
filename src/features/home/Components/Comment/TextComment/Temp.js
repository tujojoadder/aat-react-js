import React from "react";
import image from "./logo.jpg";
export default function TEmp() {
  return (
    <div className="posts">
      <div className="user-pics">
        <img src={image} alt="user3" />
      </div>
      <div className="user-content-box">
        <div className="user-names" style={{ paddingTop: "11px" }}>
          <h1 className="full-name pt-1">Olivia Brent</h1>

          <p className="time">. 58mins</p>
        </div>

        <div className="user-content ">
          <p>Nc</p>
        </div>

        <div className="content-icons">
          <i
            className="me-4 far fa-comment blue"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {" "}
            109
          </i>
          <i
            className="me-4
          fas fa-retweet green"
          >
            {" "}
            865
          </i>
          <i className="far fa-heart red">1.6k</i>
        </div>
      </div>
      
    </div>
  );
}

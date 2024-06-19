import React from 'react'
import image from "./logo.jpg";
export default function BothPost() {
  return (
    <div class="posts">
      <div class="user-pics">
        <img src={image} alt="user1" />
      </div>
      <div class="user-content-box">
        <div className="user-names" style={{ marginTop: '2px' }}>
          <div className="name-column">
            <h1 className="full-name m-0 p-0">Turjo Joadder </h1>
         <p className="user-name m-0 p-0">@eric_alvareeric</p>
          </div>
          <p className="time ms-3" style={{ marginTop: '18px' }}>  2hrs</p>
        </div>

        <div class="user-content">
          <p>
            Eat. Code, Sleep. repeat! <a href="#">#CodeNewbie</a>{" "}
            <a href="#">#100DaysOfCode</a>
          </p>
          <img
            style={{ Width: "100%", maxHeight: "65vh" }}
            src={image}
            alt="content1"
          />
        </div>
        <div className="content-icons ">
          <i
            className="far fa-comment blue"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {" "}
            109
          </i>

          <i className="fa-regular fa-thumbs-down"> 536</i>

          <i className="far fa-heart red"> 1.6k</i>
          <i class="fa-solid fa-gear"></i>
        </div>
      </div>
    </div>
  )
}

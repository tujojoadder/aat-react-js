import React from 'react'
import image from "./logo1.jpg";
export default function ImagePost() {
  return (
    <div class="posts ">
            <div class="user-pics">
              <img src={image} alt="user1" />
            </div>
            <div class="user-content-box ">
            <div className="user-names" style={{ marginTop: '2px' }}>
          <div className="name-column">
            <h1 className="full-name m-0 p-0">Turjo Joadder </h1>
            <p className="user-name m-0 p-0">@eric_alvareeric</p>
          </div>
          <p className="time ms-3" style={{ marginTop: '18px' }}>  2hrs</p>
        </div>

              <div class="user-content ">
               
                <img
                  style={{ Width: "100%", maxHeight: "65vh" }}
                  src={image}
                  alt="content1"
                />
              </div>
              <div class="content-icons">
                <i class="far fa-comment blue"> 273</i>
                <i class="fas fa-retweet green"> 2k</i>
                <i class="far fa-heart red"> 3k</i>
                
              </div>
            </div>
          </div>
  )
}

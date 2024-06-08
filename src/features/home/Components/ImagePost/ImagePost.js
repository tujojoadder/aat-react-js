import React from 'react'
import image from "./logo1.png";
export default function ImagePost() {
  return (
    <div class="tweets">
            <div class="user-pics">
              <img src={image} alt="user1" />
            </div>
            <div class="user-content-box">
              <div class="user-names">
                <hi class="full-name">Eric Alvarez</hi>
                <p class="user-name">@eric_alvarez</p>
                <p class="time"> . 2hrs</p>
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
                <i class="fas fa-chevron-up blue"></i>
              </div>
            </div>
          </div>
  )
}

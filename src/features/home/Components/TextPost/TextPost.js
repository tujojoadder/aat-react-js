import React from 'react'
import image from "./logo.jpg";
export default function TextPost() {
  return (
    <div class="posts">
            <div class="user-pics">
              <img src={image} alt="user3" />
            </div>
            <div class="user-content-box">
              <div class="user-names py-2">
                <hi class="full-name">Olivia Brent</hi>
                <p class="user-name">@iamolivia</p>
                <p class="time"> . 58mins</p>
              </div>

              <div class="user-content">
                <p>
                  We've gotta send kids back to school so one day they can be
                  doctors and scientists, and everyone can ignore them.
                </p>
              </div>

              <div class="content-icons">
                <i class="far fa-comment blue"> 109</i>
                <i class="fas fa-retweet green"> 865</i>
                <i class="far fa-heart red">1.6k</i>
                <i class="fas fa-chevron-up blue"></i>
              </div>
            </div>
          </div>
  )
}

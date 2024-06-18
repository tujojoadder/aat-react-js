import React from 'react'
import image from "./logo.jpg";
export default function TextComment() {
  return (
    <div className="posts">
    <div className="user-pics">
      <img src={image} alt="user3" />
    </div>
    <div className="user-content-box">
      <div className="user-names pt-2">
        <h1 className="full-name">Olivia Brent</h1>
        <p className="user-name">@iamolivia</p>
        <p className="time">. 58mins</p>
      </div>

      <div className="user-content">
        <p>
          We've gotta send kids back to school so one day they can be doctors and scientists, and everyone can ignore them.
        </p>
      </div>

      <div className="content-icons">
        <i className="far fa-comment blue" data-bs-toggle="modal" data-bs-target="#exampleModal"> 109</i>
        <i className="fas fa-retweet green"> 865</i>
        <i className="far fa-heart red">1.6k</i>
      </div>
    </div>

    
  </div>
  )
}

import React from 'react'
import './Profile.css'
import image from "./logo.jpg";
export default function Profile() {
  return (
    <div class="header__wrapper m-0 p-0">
    <header></header>
    <div class="cols__container">
      <div class="left__col">
        <div class="img__container">
          <img src={image} alt="Anna Smith" />
          <span></span>
        </div>
        <h2>Anna Smith</h2>

        <p>anna@example.com</p>

        <ul class="about">
          <li><span>4,073</span>Followers</li>
          <li><span>322</span>Following</li>
          <li><span>200,543</span>Attraction</li>
        </ul>

        <div class="content">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam
            erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl
            ligula egestas nulla.
          </p>

          <ul>
            <li><i class="fab fa-twitter"></i></li>
            <i class="fab fa-pinterest"></i>
            <i class="fab fa-facebook"></i>
            <i class="fab fa-dribbble"></i>
          </ul>
        </div>
      </div>
      <div class="right__col">
        <nav>


        <div className="d-flex justify-content-center">
      {/* Message Button */}
      <div className="btn-sm   btn-primary rounded-circle d-flex align-items-center justify-content-center mx-1" style={{ cursor: 'pointer', height: '30px',marginTop:'3px' }}>
        <i className="fa-solid fa-message text-white "></i>
      </div>

      {/* Add Friend Button */}
      <div className="btn-sm btn-primary mx-1 d-flex align-items-center" style={{ cursor: 'pointer'}}>
        <i className="fa-solid fa-user-plus text-white"></i>
        <span className="ms-1">Add Friend</span>
      </div>

      {/* Follow Button */}
      <div className="btn btn-info mx-1 d-flex align-items-center" style={{ cursor: 'pointer', minWidth: '70px' }}>
        Follow
      </div>
    </div>

        </nav>

        <div class="photos">
       
          <img src={image} alt="Photo" />
            <img src={image} alt="Photo" />
            <img src={image} alt="Photo" />
            <img src={image} alt="Photo" />
            <img src={image} alt="Photo" />
            <img src={image} alt="Photo" />
        </div>
      </div>
    </div>
  </div>
  )
}

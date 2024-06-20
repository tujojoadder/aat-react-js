import React from 'react'
import image from "./logo.jpg";
import './TextComment.css';
export default function TextComment() {
  return (
    <div className="posts">
      <div className="user-pics">
        <img src={image} alt="user3" />
      </div>
      <div className="user-content-text-box">
        <div className="user-names-text" style={{ marginTop: '4px' }}>
          <div className="name-column">
            <h1 className="full-name-text m-0 p-0">Mohammad </h1>
            <p className="user-name-text m-0 p-0">@eric_alvareeric</p>
          </div>
          <p className="time-text ms-3" style={{ marginTop: '7px' }}>  2hrs</p>
        </div>

        <div className="user-content-text" >
          <p style={{margin:'0px'}}>
           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci tenetur, laboriosam sed temporibus qui corporis sequi quos vel officia perferendis fuga odit facere ullam, expedita assumenda illum voluptas commodi. Impedit?
          </p>
        </div>

        <div className="content-icons-text pt-2  pe-3" style={{padding:'0px'}}>
          <i
            className="far fa-heart red "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {" "}
            109
          </i>

          <i className="fa-regular fa-thumbs-down ps-md-3 ms-1"> 536</i>

          <i className="far fa-comment blue  ps-md-3 ms-1"> 1.6k</i>
          <i class="fa-solid fa-chevron-up ps-md-3 me-2"></i>
        </div>
      </div>

   
    </div>
  )
}

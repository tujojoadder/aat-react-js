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
          <p className="time ms-3" style={{ paddingTop: '18px' }}>  2hrs</p>
        </div>

        <div class="user-content" style={{marginTop:'-10px'}}>
          <p style={{marginBottom:'5px'}}>
            Eat. Code, Sleep. repeat! <a href="#">#CodeNewbie</a>{" "}
            <a href="#">#100DaysOfCode</a>
          </p>
          <img
            style={{ Width: "100%", maxHeight: "65vh",minHeight:'350px' }}
            src={image}
            alt="content1"
          />
        </div>
        <div className="content-icons px-2 ">
          <i
            className="far fa-heart red "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {" "}
            109
          </i>

          <i className="fa-regular fa-thumbs-down ps-md-3"> 536</i>

          <i className="far fa-comment blue  ps-md-3"> 1.6k</i>
        
          <i class="fa-solid fa-chevron-up ps-md-3 pe-4"></i>
        </div>
      </div>
    </div>
  )
}

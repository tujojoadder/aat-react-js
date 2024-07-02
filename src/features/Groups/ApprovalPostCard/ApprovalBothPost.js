import React from 'react'
import image from "./logo.jpg";
export default function ApprovalBothPost() {
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
        <p className="time me-4" style={{ paddingTop: '18px' }}>  2hrs</p>
      </div>

      <div class="user-content" style={{marginTop:'-10px'}}>
        <p style={{marginBottom:'5px'}}>
          Eat. Code, Sleep. repeat! <a href="#">#CodeNewbie</a>{" "}
          <a href="#">#100DaysOfCode</a>
        </p>
        <img
          style={{ Width: "100%", maxHeight: "65vh" }}
          src={image}
          alt="content1"
        />
      </div>
      <div className="content-actions pe-3 d-flex justify-content-end">
          <button className="btn btn-success me-2">Approve</button>
          <button className="btn btn-danger">Remove</button>
        </div>
    </div>
  </div>
  )
}

import React from "react";
import image from "./logo.jpg";
export default function SendFriendRequest(Props) {
  return (
    <div class="d-flex bd-highlight mt-1 ">
      <div class=" bd-highlight">
        <img
          class="rounded-circle rounded "
          src={image}
          alt=""
          height="45px"
          width="45px"
        />
      </div>
      <div class="p-2 bd-highlight "style={{ height:'30px',overflow:'hidden' }}>
        
        <div class=" bd-highlight ">
          <p class="fw-bold">Turjo Joadder</p>
        </div>
      </div>
      <div class="ms-auto p-1 bd-highlight">
        
        <button  style={{ borderRadius:'30px' }} type="button" class="btn btn-dark ">
          Add Friend
        </button>
      </div>
    </div>
  );
}

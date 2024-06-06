import React from 'react'
import image from "./logo.jpg";
export default function HadithIteam() {
  return (
    <div className="item mt-1 pb-2">
    <div className="user-div ">
      <div class="d-flex flex-column bd-highlight ">
        <div class="mt-2 mb-1 bd-highlight">
          <img
            src={image}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "100%",
              border: "2px solid blue",
            }}
            alt=""
          />
        </div>
        <div class=" px-1  bd-highlight name">
          <p>
            <b>Inamul haque Bijoy</b>
          </p>
        </div>
        <div class=" bd-highlight px-1">এ মর্মে আল্লাহ্ তা’আলার</div>
      </div>
    </div>
    
  </div>
  )
}

import React from 'react'
import image from "./logo.jpg";
import {
  NavLink
} from "react-router-dom";
export default function HadithIteam() {
  return (
    <div className="item " style={{cursor:'pointer'}}>
                <NavLink to="/day" style={{textDecoration:'none'}}>
    <div className="user-div ">
      <div className="d-flex flex-column bd-highlight ">
        <div className="mt-2 mb-1 bd-highlight">
          <img
            src={image}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid blue",
            }}
            alt=""
          />
        </div>
        <div className=" px-1  bd-highlight name text-dark">
          <p>
            <b>Inamul haque Bijoy</b>

            <b>Inamul </b>
          </p>
        </div>
        <div style={{ color:'black' }} className=" bd-highlight px-1 pb-2">এ মর্মে আল্লাহ্ তা’আলার</div>
      </div>
    </div>
    </NavLink>
  </div>
  )
}

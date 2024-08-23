import React from 'react'
import { NavLink,useNavigate} from "react-router-dom";

export default function LargeScreenProfileBack({text}) {
    const navigate = useNavigate();

  return (
    <div className="d-none pt-1 d-md-flex align-items-center justify-content-between pb-1 ms-2 ">
    <button className="btn btn-link pt-2 p-0 m-0"  onClick={() => navigate(-1)} >
      <i className="fas fa-arrow-left fs-4"></i>
    </button>
    <h5 style={{fontWeight:'bolder'}} className="flex-grow-1 ps-3 pt-1  text-left mb-0">{text}</h5>
  </div>
  )
}

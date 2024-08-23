import React from 'react'
import { NavLink,useNavigate} from "react-router-dom";

export default function LargeScreenProfile({text}) {
    const navigate = useNavigate();

  return (
    <div className="d-none d-md-flex align-items-center justify-content-between ">
    <button className="btn btn-link pt-2"  onClick={() => navigate(-1)} >
      <i className="fas fa-arrow-left fs-4"></i>
    </button>
    <h5 className="flex-grow-1 ps-2 text-left mb-0">{text}</h5>
  </div>
  )
}

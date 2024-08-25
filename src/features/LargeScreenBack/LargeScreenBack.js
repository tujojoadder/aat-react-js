import React from 'react'
import { NavLink,useNavigate} from "react-router-dom";

export default function LargeScreenBack({text}) {
  const navigate = useNavigate();

  return (
    <div className="d-none d-sm-flex align-items-center justify-content-between ">
    <button className="btn btn-link"  onClick={() => navigate(-1)} >
      <i className="fas fa-arrow-left fs-5"></i>
    </button>
    <h3 className="flex-grow-1 text-center mb-0">{text}</h3>
  </div>
  )
}

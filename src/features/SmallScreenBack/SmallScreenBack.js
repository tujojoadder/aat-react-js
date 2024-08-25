import React from 'react'
import { NavLink,useNavigate} from "react-router-dom";
export default function SmallScreenBack({text}) {
 
    const navigate = useNavigate();

    return (
        <div className="header-container d-sm-none fixed-top ">
        <span className="company-name"><i className="fa-solid fa-arrow-left pe-2" onClick={() => navigate(-1)}></i> <span className=''>{text}</span></span>
  
      </div>
  )
}

import React, { useState } from "react";
import { setGroupAudience } from "../../home/HomeSlice";
import { useSelector } from "react-redux";

export default function GroupAbout() {


  const audience = useSelector((state) => state.home.audience);
  const groupDetails = useSelector((state) => state.home.groupDetails);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const fullText =groupDetails;
  const previewText = fullText.substring(0, 300);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="px-3">
        <div className="about-section  mt-2 mb-2">
         
         
         {/* Public group */}
         {/*  <div className="about-item">  
            <i className="fa-solid fa-lock" style={{ fontSize: "1rem" }}></i>
            <strong>Private Group</strong> 
          </div> */}


        {/* Private group */}
          <div className="about-item m-0 p-0" >
            <i
              className="fa-solid fa-earth-americas"
              style={{ fontSize: "1rem" }}
            ></i>{" "}
            <strong>{audience}</strong> 
          </div>



        </div>
        <p className="p-1">
          {isExpanded ? fullText : previewText}
          {fullText.length > 300 && (
            <span
              onClick={toggleText}
              style={{ color: "blue", cursor: "pointer" }}
            >
              {isExpanded ? " See less" : "... See more"}
            </span>
          )}
        </p>
      </div>
    </>
  );
}

import React, { useState } from "react";

export default function GroupAbout() {
  const [isExpanded, setIsExpanded] = useState(false);
  const fullText =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione expedita esse illo dolores beatae, deleniti neque aliquam magni quae officiis deserunt nulla animi, rerum harum blanditiis eos? Porro, eum provident.lore Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor corrupti, facere dolorum rem asperiores aspernatur, beatae odio omnis soluta saepe praesentium. Fugit iste, vel ducimus dignissimos eius nemo at quisquam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi eveniet modi aliquid numquam ratione odio ea. Nulla et voluptatum architecto, harum, fugiat ratione consequuntur, dolorem molestias asperiores iste officiis earum?";
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
            <i class="fa-solid fa-lock" style={{ fontSize: "1rem" }}></i>
            <strong>Private Group</strong> 
          </div> */}


        {/* Private group */}
          <div className="about-item m-0 p-0" >
            <i
              className="fa-solid fa-earth-americas"
              style={{ fontSize: "1rem" }}
            ></i>{" "}
            <strong>Public Group</strong> 
          </div>



        </div>
        <p>
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

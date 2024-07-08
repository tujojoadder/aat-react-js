import React, { useState } from "react";

export default function PageAbout() {
  const [isExpanded, setIsExpanded] = useState(false);
  const fullText =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione expedita esse illo dolores beatae, deleniti neque aliquam magni quae officiis deserunt nulla animi, rerum harum blanditiis eos? Porro, eum provident. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor corrupti, facere dolorum rem asperiores aspernatur, beatae odio omnis soluta saepe praesentium. Fugit iste, vel ducimus dignissimos eius nemo at quisquam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi eveniet modi aliquid numquam ratione odio ea. Nulla et voluptatum architecto, harum, fugiat ratione consequuntur, dolorem molestias asperiores iste officiis earum?";
  const previewText = fullText.substring(0, 300);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="px-3 pb-5">
        <div className="about-section mt-2 mb-2">
          <div className="about-item m-0 p-0">
            <i className="fa-solid fa-flag" style={{ fontSize: "1rem" }}></i>{" "}
            <strong>Fan Page</strong>
          </div>
        </div>

        <div className="contact-info mt-4">
          <span style={{fontSize:'20px'}} className=""><b>Contact Info</b>  </span>
          <hr />
          <p>
            <i className="fa-solid fa-map-marker-alt"></i> Salap, Howrah, India
          </p>
          <p>
            <i className="fa-solid fa-phone"></i> +1234567890
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i>{" "}
            <a href="mailto:timesofcricket18@gmail.com">
              timesofcricket18@gmail.com
            </a>
          </p>
        </div>

        <div className="basic-info mt-4">

          <span style={{fontSize:'20px'}} className=""><b>Basic Info</b>  </span>
          <hr />
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
      </div>
    </>
  );
}

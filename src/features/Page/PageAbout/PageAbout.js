import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function PageAbout() {
  // Fetch page details from Redux state
  const pagePhone = useSelector((state) => state?.home?.pagePhone);
  const pageCategory = useSelector((state) => state?.home?.pageCategory);
  const pageLocation = useSelector((state) => state?.home?.pageLocation);
  const pageEmail = useSelector((state) => state?.home?.pageEmail);
  const pageDetails = useSelector((state) => state?.home?.pageDetails);
  const pageError = useSelector((state) => state?.home?.pageError);

  // Text state management
  const [isExpanded, setIsExpanded] = useState(false);

  // Placeholder text or dynamic page details if available
  const fullText = pageDetails;
  const previewText = fullText?.substring(0, 300);

  // Toggle between full and preview text
  const toggleText = () => setIsExpanded(!isExpanded);

  // Only show Contact Info section if any of the details are available
  const hasContactInfo = pagePhone || pageLocation || pageEmail;

  return (
<>
    {!pageError && (<div className="page-about pb-5 mx-3">
      {/* Page Category Section */}
      <div className="about-section mt-2 mb-2">
        <div className="about-item m-0 p-0">
          <i className="fa-solid fa-flag" style={{ fontSize: "1rem" }}></i>{" "}
          <strong>{pageCategory || "Fan Page"}</strong>
        </div>
      </div>

      {/* Conditionally render Contact Info Section */}
      {hasContactInfo && (
        <div className="contact-info mt-4 px-3">
          <span className="section-title" style={{ fontSize: '20px' }}>
            <b>Contact Info</b>
          </span>
          <hr />
          {pageLocation && (
            <p>
              <i className="fa-solid fa-map-marker-alt"></i> {pageLocation}
            </p>
          )}
          {pagePhone && (
            <p>
              <i className="fa-solid fa-phone"></i> {pagePhone}
            </p>
          )}
          {pageEmail && (
            <p>
              <i className="fa-solid fa-envelope"></i>{" "}
              <a href={`mailto:${pageEmail}`}>{pageEmail}</a>
            </p>
          )}
        </div>
      )}

      {/* Basic Info Section */}
      <div className="basic-info mt-4 px-3">
        <span className="section-title" style={{ fontSize: '20px' }}>
          <b>Basic Info</b>
        </span>
        <hr />
        <p>
          {isExpanded ? fullText : previewText}
          {fullText?.length > 300 && (
            <span
              onClick={toggleText}
              style={{ color: "blue", cursor: "pointer" }}
            >
              {isExpanded ? " See less" : "... See more"}
            </span>
          )}
        </p>
      </div>
    </div>) }
    </>
  );
}

import React from "react";
import "./About.css";
import { useGetAboutDataQuery } from "../../../../services/profileApi";

export default function MyAbout({ userId }) {
  const { data, error, isLoading, isSuccess } =
    useGetAboutDataQuery();
    
if (isSuccess) {
  console.log(data);
}

  return (
    <>
      {isSuccess && (
        <div className="about-section border mx-3" style={{ marginBottom: "10vh" }}>
          {/* Conditionally render each section if the data is available */}

          {isSuccess && data.data.location && (
            <div className="about-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>
                Location: <strong>{data.data.location}</strong>
              </span>
            </div>
          )}

          {isSuccess && data.data.relationship_status && (
            <div className="about-item">
              <i className="fas fa-heart"></i>
              <span>
                Relationship Status:{" "}
                <strong>{data.data.relationship_status}</strong>
              </span>
            </div>
          )}

          {isSuccess && data.data.gender && (
            <div className="about-item">
              <i className="fas fa-venus-mars"></i>
              <span>
                Gender: <strong>{data.data.gender}</strong>
              </span>
            </div>
          )}

          {isSuccess && data.data.birthdate && (
            <div className="about-item">
              <i className="fas fa-birthday-cake"></i>
              <span>
                Birthdate:{" "}
                <strong>
                  {new Date(data.data.birthdate).toLocaleDateString()}
                </strong>
              </span>
            </div>
          )}

          {isSuccess && data.data.work && (
            <div className="about-item">
              <i className="fas fa-briefcase"></i>
              <span>
                Work: <strong>{data.data.work}</strong>
              </span>
            </div>
          )}

          {isSuccess && data.data.education && (
            <div className="about-item">
              <i className="fas fa-graduation-cap"></i>
              <span>
                Education: <strong>{data.data.education}</strong>
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";

export default function MessageSmallDeviceHead({ profileData }) {
  const navigate = useNavigate();

  return (
    <>
      {profileData && (
        <div className="header-container d-sm-none fixed-top bg-light p-0">
          <div
            className="posts m-0 py-2 bg-light rounded d-flex align-items-center"
            style={{
              borderRadius: "0px",
              backgroundColor: "#ffff",
              border: "none",
              minHeight: "65px",
            }}
          >
            <i
              className="fa-solid fa-arrow-left text-dark fs-4 p-3 pe-2"
              onClick={() => navigate(-1)}
              style={{ cursor: "pointer" }}
            ></i>

            <div className="user-pics ms-1">
              <img
                src={`${process.env.REACT_APP_LARAVEL_URL}/${profileData?.data?.profile_picture}`}
                className="rounded-circle user_img_msg"
                alt="user"
                style={{ width: "45px", height: "45px" }}
              />
            </div>

            <div className="user-content-text-box ms-1">
              <div className="user-names-text" style={{ marginTop: "2px" }}>
                <h1
                  className="full-name-text m-0 p-0"
                  style={{ fontSize: "1rem" }}
                >
                  {profileData?.data?.user_fname}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

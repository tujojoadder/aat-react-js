import React, { useState } from "react";
import "./UserDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { setShow_Modal, setModalMessage } from "../../home/HomeSlice";
export default function UserDetails() {
  const dispatch = useDispatch();

  const [showLogout, setShowLogout] = useState(false);

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const handleClick = () => {
    dispatch(setShow_Modal({ show_modal: true }));
    dispatch(setModalMessage({ modal_message: "Do you want to logout ?" }));
  };

  const profile_picture = useSelector((state) => state.home.profile_picture);
  const user_fname = useSelector((state) => state.home.user_fname);
  const user_lname = useSelector((state) => state.home.user_lname);
  const email = useSelector((state) => state.home.email);
  const identifier = useSelector((state) => state.home.identifier);

  return (
    <>
      {profile_picture && email && identifier && (
        <div
          style={{ backgroundColor: "#ffffff" }}
          className="user-details-container d-flex  align-items-center mt-3 py-2"
        >
          <div className="profile-image me-2">
            <img
              src={`http://127.0.0.1:8000/${profile_picture}`}
              alt="user"
              height="45px"
              width="45px"
            />{" "}
          </div>
          <div className="profile-info flex-grow-1 d-none d-lg-block">
            <p className="user-details-user-name fw-bold mb-0 text-truncate">
              {user_fname} {user_lname}
            </p>
            <p className="text-muted mb-0 text-truncate">{email}</p>
          </div>
          <div style={{}} className="logout-icon ms-auto position-relative ">
            <i
              className="fas fa-ellipsis-v p-1 mx-1"
              onClick={toggleLogout}
              style={{ cursor: "pointer", color: "black" }}
            ></i>
            {showLogout && (
              <div
                onClick={handleClick}
                className="logout-option position-absolute bg-white border p-0 mt-1  d-flex align-items-center"
              >
                <button
                  style={{ textDecoration: "none", color: "black" }}
                  className="btn btn-link"
                >
                  <i
                    style={{ color: "black" }}
                    class="fa-solid fa-right-from-bracket"
                  ></i>{" "}
                  <span className="text-dark d-none d-lg-inline">Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

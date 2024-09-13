import React, { useState, useEffect } from "react";
import { handleApiError } from "../../handleApiError/handleApiError";
import { useDispatch } from "react-redux";
import { useJoinPageMutation, useLeavePageMutation } from "../../../services/pagesApi";

export default function PageButtons({ pageId, joinStatus }) {
  const [joinPublicGroup, { isLoading: isJoining }] = useJoinPageMutation();
  const [leaveGroup, { isLoading: isLeaving }] = useLeavePageMutation();
  const [isJoined, setIsJoined] = useState(joinStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsJoined(joinStatus);
  }, [joinStatus]);

  const handleJoinGroup = async () => {
    try {
      await joinPublicGroup(pageId).unwrap();
      setIsJoined(true);
    } catch (err) {
      handleApiError(err, dispatch);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup(pageId).unwrap();
      setIsJoined(false);
    } catch (err) {
      handleApiError(err, dispatch);
    }
  };

  return (
    <>
      <div>
        <div
          className={`btn btn-md d-flex align-items-center mx-1 ${
            isJoined ? "btn-secondary" : "btn-primary"
          } ${isJoining || isLeaving ? "disabled" : ""}`}
          style={{
            cursor: isJoining || isLeaving ? "not-allowed" : "pointer",
            opacity: isJoining || isLeaving ? 0.85 : 1,
            transition: "background-color 0.3s ease, opacity 0.3s ease",
            backgroundColor: isJoined ? "#e4e6eb" : "#007bff", // Your original colors
            color: isJoined ? "#000" : "#fff", // Contrast color for text
          }}
          onClick={isJoined ? handleLeaveGroup : handleJoinGroup}
        >
          <i
            className={`fa-solid fa-thumbs-up ${
              isJoining || isLeaving ? "pulsating-icon" : ""
            }`}
          ></i>
          <span className={`ms-1 ${isJoining || isLeaving ? "pulsating-text" : ""}`}>
            {isJoining
              ? "Liking..."
              : isLeaving
              ? "Unliking..."
              : isJoined
              ? "Unlike"
              : "Like"}
          </span>
        </div>
      </div>

      <div
        className="btn btn-md mx-1 me-3 d-flex align-items-center"
        style={{
          cursor: "pointer",
          minWidth: "70px",
          backgroundColor: "#e4e6eb", // Keep your original color
          transition: "background-color 0.3s ease, opacity 0.3s ease",
          color: "#000", // Contrast color for text
        }}
      >
        <i className="fa-solid fa-share"></i>
        &nbsp; Share
      </div>
    </>
  );
}

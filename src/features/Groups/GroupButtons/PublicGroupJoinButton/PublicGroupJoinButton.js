import React, { useState, useEffect } from "react";
import {
  useJoinPublicGroupMutation,
  useLeaveGroupMutation,
} from "../../../../services/groupsApi";
import { handleApiError } from "../../../handleApiError/handleApiError";
import { useDispatch } from "react-redux";

export default function PublicGroupJoinButton({ groupId, joinStatus }) {
  const [joinPublicGroup, { isLoading: isJoining }] =
    useJoinPublicGroupMutation();
  const [leaveGroup, { isLoading: isLeaving }] = useLeaveGroupMutation();
  const [isJoined, setIsJoined] = useState(joinStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsJoined(joinStatus);
  }, [joinStatus]);

  const handleJoinGroup = async () => {
    try {
      await joinPublicGroup(groupId).unwrap();
      setIsJoined(true);
    } catch (err) {
      handleApiError(err, dispatch);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup(groupId).unwrap();
      setIsJoined(false);
    } catch (err) {
      handleApiError(err, dispatch);
    }
  };

  return (
    <>
      <div>
        {!isJoined ? (
          <div
            className={`btn btn-md btn-primary mx-1 d-flex align-items-center ${
              isJoining ? "disabled" : ""
            }`}
            style={{
              cursor: isJoining ? "not-allowed" : "pointer",
              opacity: isJoining ? 0.85 : 1,
            }}
            onClick={handleJoinGroup}
          >
            <i
              className={`fa-solid fa-users ${
                isJoining ? "pulsating-icon" : ""
              }`}
            ></i>
            <span className={`ms-1 ${isJoining ? "pulsating-text" : ""}`}>
              {isJoining ? "Joining..." : "Join Group"}
            </span>
          </div>
        ) : (
          <div
            className={`btn btn-md  mx-1 d-flex align-items-center ${
              isLeaving ? "disabled" : ""
            }`}
            style={{
              backgroundColor: "#e4e6eb", // Keep your original color
              transition: "background-color 0.3s ease, opacity 0.3s ease",
              cursor: isLeaving ? "not-allowed" : "pointer",
              opacity: isLeaving ? 0.85 : 1,
            }}
            onClick={handleLeaveGroup}
          >
            <i
              className={`fa-solid fa-user-minus ${
                isLeaving ? "pulsating-icon" : ""
              }`}
            ></i>
            <span className={`ms-1 ${isLeaving ? "pulsating-text" : ""}`}>
              {isLeaving ? "Leaving..." : "Leave Group"}
            </span>
          </div>
        )}
      </div>

      <div
        className="btn btn-md mx-1  me-3 d-flex align-items-center"
        style={{
          cursor: "pointer",
          minWidth: "70px",

          backgroundColor: "#e4e6eb",
        }}
      >
        <i className="fa-solid fa-share"></i>
        &nbsp; Share
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useJoinPrivateGroupMutation,
  useCancelJoinRequestMutation,
  useLeaveGroupMutation,
} from "../../../../services/groupsApi";
import { handleApiError } from "../../../handleApiError/handleApiError";

export default function PrivateGroupJoinButton({ groupId, isRequest, isJoin }) {
  const [joinStatus, setJoinStatus] = useState(
    isRequest ? "pending" : isJoin ? "joined" : "none"
  );
  const [joinPrivateGroup, { isLoading: isJoining }] =
    useJoinPrivateGroupMutation();
  const [cancelJoinRequest, { isLoading: isCanceling }] =
    useCancelJoinRequestMutation();
  const [leaveGroup, { isLoading: isLeaving }] = useLeaveGroupMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Update the joinStatus state based on the isJoin prop
    setJoinStatus(isJoin ? "joined" : isRequest ? "pending" : "none");
  }, [isJoin, isRequest]);

  const handleJoinGroup = async () => {
    try {
      await joinPrivateGroup(groupId).unwrap();
      setJoinStatus("pending");
    } catch (err) {
      handleApiError(err, dispatch);
    }
  };

  const handleCancelJoinRequest = async () => {
    try {
      await cancelJoinRequest(groupId).unwrap();
      setJoinStatus("none");
    } catch (err) {
      handleApiError(err, dispatch);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup(groupId).unwrap();
      setJoinStatus("none"); // Reset to 'none' after leaving
    } catch (err) {
      handleApiError(err, dispatch);
    }
  };

  const renderButtonContent = () => {
    if (isJoining) return "Joining...";
    if (isCanceling) return "Canceling...";
    if (isLeaving) return "Leaving...";

    // Adjust content based on current join status
    if (joinStatus === "joined") return "Leave Group";
    if (joinStatus === "pending") return "Cancel Join Request";
    return "Join Group";
  };

  return (
    <>
      <div className="d-flex">
        <button
          className={`btn btn-md btn-primary mx-1 d-flex align-items-center justify-content-center ${
            isJoining || isCanceling || isLeaving ? "disabled" : ""
          }`}
          style={{
            
            cursor:
              isJoining || isCanceling || isLeaving ? "not-allowed" : "pointer",
            opacity: isJoining || isCanceling || isLeaving ? 0.85 : 1,
            transition: "all 0.3s ease",
            minWidth: "150px", // Ensures consistent button size
          }}
          onClick={
            joinStatus === "joined"
              ? handleLeaveGroup
              : joinStatus === "pending"
              ? handleCancelJoinRequest
              : handleJoinGroup
          }
        >
          <i
            className={`fa-solid fa-users ${
              isJoining || isCanceling || isLeaving ? "pulsating-icon" : ""
            }`}
          ></i>
          <span
            className={`ms-1 ${
              isJoining || isCanceling || isLeaving ? "pulsating-text" : ""
            }`}
          >
            {renderButtonContent()}
          </span>
        </button>
      </div>

      <div
        className="btn btn-md mx-1 mt-3 me-3 d-flex align-items-center"
        style={{
          cursor: "pointer",
          minWidth: "70px",
          maxHeight: "35px",
          backgroundColor: "#e4e6eb",
        }}
      >
        <i className="fa-solid fa-share"></i>
        &nbsp; Share
      </div>
    </>
  );
}

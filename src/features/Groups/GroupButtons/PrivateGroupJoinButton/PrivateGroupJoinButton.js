import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useJoinPrivateGroupMutation, useCancelJoinRequestMutation } from "../../../../services/groupsApi";
import { handleApiError } from "../../../handleApiError/handleApiError";

export default function PrivateGroupJoinButton({ groupId, isRequest }) {
  const [joinStatus, setJoinStatus] = useState(isRequest ? 'pending' : 'none'); // Initialize based on isRequest
  const [joinPrivateGroup, { isLoading: isJoining }] = useJoinPrivateGroupMutation();
  const [cancelJoinRequest, { isLoading: isCanceling }] = useCancelJoinRequestMutation();
  const dispatch = useDispatch();

  const handleJoinGroup = async () => {
    try {
      await joinPrivateGroup(groupId).unwrap();
      setJoinStatus('pending'); // Update the join status to 'pending' after successful join request
    } catch (err) {
      handleApiError(err, dispatch);
    }
  };

  const handleCancelJoinRequest = async () => {
    try {
      await cancelJoinRequest(groupId).unwrap();
      setJoinStatus('none'); // Update the join status to 'none' after successful cancel request
    } catch (err) {
      handleApiError(err, dispatch);
    }
  };

  return (
    <div>
      <div
        className={`btn btn-md btn-primary mx-1 d-flex align-items-center ${isJoining || isCanceling ? 'disabled' : ''}`}
        style={{
          cursor: isJoining || isCanceling ? 'not-allowed' : 'pointer',
          opacity: isJoining || isCanceling ? 0.85 : 1,
          transition: 'all 0.3s ease', // Smooth transition
        }}
        onClick={joinStatus === 'pending' ? handleCancelJoinRequest : handleJoinGroup}
      >
        <i className={`fa-solid fa-users ${isJoining || isCanceling ? 'pulsating-icon' : ''}`}></i>
        <span className={`ms-1 ${isJoining || isCanceling ? 'pulsating-text' : ''}`}>
          {isJoining ? 'Joining...' : isCanceling ? 'Canceling...' : joinStatus === 'pending' ? 'Cancel Join Request' : 'Join Group'}
        </span>
      </div>
    </div>
  );
}

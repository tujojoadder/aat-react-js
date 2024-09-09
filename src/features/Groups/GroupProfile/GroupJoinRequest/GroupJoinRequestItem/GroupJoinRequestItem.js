import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useManageJoinGroupRequestMutation } from "../../../../../services/groupsApi";
import "./GroupJoinRequestItem.css";
import { handleApiError } from "../../../../handleApiError/handleApiError";

export default function GroupJoinRequestItem({
  groupId,
  name,
  handle,
  image,
  isActive,
  user_id
}) {
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [requestProcessed, setRequestProcessed] = useState(false); // New state for tracking request status
  const [isAccepted, setIsAccepted] = useState(false); // Local state for accepted status
  const [isRejected, setIsRejected] = useState(false); // Local state for rejected status

  const [
    ManageJoinGroupRequestMutation,
    {
      isSuccess: ManageJoinGroupRequestMutationSuccess,
      isError: ManageJoinGroupRequestMutationError,
    },
  ] = useManageJoinGroupRequestMutation();

  const handleAcceptRequest = async (e) => {
    e.preventDefault();
    setAcceptLoading(true);
    try {
      const res = await ManageJoinGroupRequestMutation({
        sender_id: user_id,
        decision: "add",
        groupId: groupId
      }).unwrap();
      if (res.data) {
        // Remove Redux dispatch calls
        setIsAccepted(true); // Update local state
        setRequestProcessed(true); // Hide buttons
      } else if (res.error) {
        handleApiError(res.error);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setAcceptLoading(false);
    }
  };

  const handleRejectRequest = async (e) => {
    e.preventDefault();
    setRejectLoading(true);
    try {
      const res = await ManageJoinGroupRequestMutation({
        sender_id: user_id,
        decision: "cancel",
        groupId: groupId
      }).unwrap();
      if (res.data) {
        // Remove Redux dispatch calls
        setIsRejected(true); // Update local state
        setRequestProcessed(true); // Hide buttons
      } else if (res.error) {
        handleApiError(res.error);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setRejectLoading(false);
    }
  };

  return (
    <div
      className={`friend-request-container px-3 d-flex align-items-center mt-2 py-2 shadow-sm rounded ${
        isActive ? "active" : ""
      }`}
      style={{ maxWidth: '100%', overflowX: 'hidden' }}
    >
      <div className="profile-image me-2">
        <NavLink
          key={user_id}
          to={`/friends/requests/${user_id}`}
          className="text-decoration-none"
        >
          <img
            className="rounded-circle"
            src={image}
            alt="user"
            height="55px"
            width="55px"
          />
        </NavLink>
      </div>
      <div className="profile-info flex-grow-1">
        <p className="fw-bold mb-0 text-truncate">{name}</p>
        <p className="text-muted mb-0 text-truncate">{handle}</p>
      </div>
      <div className="d-flex">
        {!requestProcessed && !isAccepted && !isRejected ? (
          <>
            <div className="add-delete-button me-2">
              <button
                className="btn-delete-friend"
                type="button"
                onClick={handleRejectRequest}
                disabled={rejectLoading}
              >
                {rejectLoading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Cancel"
                )}
              </button>
            </div>
            <div className="add-friend-button">
              <button
                className="btn-add-friend btn-primary"
                type="button"
                onClick={handleAcceptRequest}
                style={{
                  backgroundColor: "#0d8de5",
                  outline: "none",
                  boxShadow: "none",
                  border: "none",
                }}
                disabled={acceptLoading}
              >
                {acceptLoading ? (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </>
        ) : null}

        {isAccepted && (
          <div className="add-friend-button">
            <button
              className="btn py-2 btn-md"
              style={{ backgroundColor: "#28a745", color: "white" }}
              disabled
            >
              Request Accepted
            </button>
          </div>
        )}

        {isRejected && (
          <div className="add-friend-button">
            <button
              className="btn py-2 btn-md"
              style={{ backgroundColor: "#dc3545", color: "white" }}
              disabled
            >
              Request Rejected
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

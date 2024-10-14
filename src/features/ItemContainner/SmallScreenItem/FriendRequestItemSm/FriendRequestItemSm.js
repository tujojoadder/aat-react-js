import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useManageFriendRequestMutation } from "../../../../services/friendsApi";
import { handleApiError } from "../../../handleApiError/handleApiError";
import { setToastSuccess, setRequestAccepted, setRequestRejected } from "../../../home/HomeSlice";
import { useDispatch, useSelector } from "react-redux";
import "./FriendRequestItemSm.css";

export default function FriendRequestItemSm({
  name,
  handle,
  image,
  isActive,
  user_id
}) {
  const dispatch = useDispatch();

  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  // Access accepted and rejected requests from Redux state
  const acceptedRequests = useSelector((state) => state.home.acceptedRequests);
  const rejectedRequests = useSelector((state) => state.home.rejectedRequests);
  const requestSent = useSelector((state) => state.home.sentRequests[user_id]);
  const [
    ManageFriendRequestMutation,
    {
      isSuccess: useManageFriendRequestMutationSuccess,
      isError: useManageFriendRequestMutationError,
    },
  ] = useManageFriendRequestMutation();

  const handleAcceptRequest = async (e) => {
    e.preventDefault();
    setAcceptLoading(true);
    try {
      const res = await ManageFriendRequestMutation({
        sender_id: user_id,
        decision: "accepted",
      }).unwrap();
      if (res.data) {
        dispatch(setToastSuccess({ toastSuccess: "Friend added successfully" }));
        dispatch(setRequestAccepted({ userId: user_id })); // Update Redux state
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    } finally {
      setAcceptLoading(false);
    }
  };

  const handleRejectRequest = async (e) => {
    e.preventDefault();
    setRejectLoading(true);
    try {
      const res = await ManageFriendRequestMutation({
        sender_id: user_id,
        decision: "rejected",
      }).unwrap();
      if (res.data) {
        dispatch(setToastSuccess({ toastSuccess: "Friend request rejected" }));
        dispatch(setRequestRejected({ userId: user_id })); // Update Redux state
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    } finally {
      setRejectLoading(false);
    }
  };

  // Check if the friend request has been accepted or rejected
  const isRequestAccepted = acceptedRequests[user_id];
  const isRequestRejected = rejectedRequests[user_id];

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
        {!isRequestAccepted && !isRequestRejected && !requestSent ? (
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
                  <i className="fa-solid fa-xmark"></i>
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
        ) : isRequestAccepted ? (
          <div className="add-friend-button">
            <button
              className="btn py-2 btn-md"
              style={{ backgroundColor: "#28a745", color: "white" }}
              disabled
            >
              Request Accepted
            </button>
          </div>
        ) : (
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

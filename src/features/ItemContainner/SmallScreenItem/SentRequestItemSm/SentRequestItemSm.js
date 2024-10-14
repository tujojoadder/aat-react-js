import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleApiError } from "../../../handleApiError/handleApiError";
import {
  useCancelFriendRequestMutation,
  useSendFriendRequestMutation,
} from "../../../../services/friendsApi";
import {
  setToastSuccess,
  setRequestSent,
  setRequestRejected,
  setRequestCancel,
} from "../../../home/HomeSlice";
import "./SentRequestItemSm.css";

export default function SentRequestItemSm({
  name,
  user_id,
  handle,
  image,
  isActive,
}) {
  const dispatch = useDispatch();
  // Access accepted and rejected requests from Redux state
  const isRequestAccepted = useSelector(
    (state) => state.home.acceptedRequests[user_id]
  );
  const isRequestCancel = useSelector(
    (state) => state.home.cancelRequests[user_id]
  );
  const isRequestRejected = useSelector(
    (state) => state.home.rejectedRequests[user_id]
  );
  const isRequestSent = useSelector(
    (state) => state.home.sentRequests[user_id]
  );
  

  // Redux selectors for request status
  const requestSent = useSelector((state) => state.home.sentRequests[user_id]);
  const requestRejected = useSelector(
    (state) => state.home.rejectedRequests[user_id]
  );

  const [cancelFriendRequest, { isLoading: cancelingRequest }] =
    useCancelFriendRequestMutation();
  const [sendFriendRequest, { isLoading: sendingRequest }] =
    useSendFriendRequestMutation();
  const [isAddButtonVisible, setAddButtonVisible] = useState(false);

  const handleCancelButton = async (e) => {
    e.preventDefault();
    try {
      const res = await cancelFriendRequest({ receiver_id: user_id });
      if (res.data) {
        dispatch(
          setToastSuccess({
            toastSuccess: "Friend request canceled successfully",
          })
        );
        dispatch(setRequestCancel({ userId: user_id }));
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  const handleAddButton = async (e) => {
    e.preventDefault();
    try {
      const res = await sendFriendRequest({ receiver_id: user_id });
      if (res.data) {
        dispatch(
          setToastSuccess({ toastSuccess: "Friend request sent successfully" })
        );
        dispatch(setRequestSent({ userId: user_id }));
        
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  useEffect(() => {
    // Initially show the add button if request has been canceled
    if (requestRejected && !requestSent) {
      setAddButtonVisible(true);
    }
  }, [requestRejected, requestSent]);

  return (
    <div
      className={`friend-request-container px-3 d-flex align-items-center mt-2 py-2 shadow-sm rounded ${
        isActive ? "active" : ""
      }`}
      style={{ maxWidth: "100%", overflowX: "hidden" }}
    >
      <div className="profile-image me-2">
        <NavLink
          key={user_id}
          to={`/friends/sent-requests/${user_id}`}
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
      <div className="add-friend-button">
        {isRequestCancel ? (
          <button
          onClick={handleAddButton}
          className="btn-add-friend"
          type="button"
          disabled={sendingRequest}
          style={{
            backgroundColor: sendingRequest ? "#c4c4c4" : "#0d8de5",
            cursor: sendingRequest ? "not-allowed" : "pointer",
          }}
        >
          {sendingRequest ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <>
              <i className="fas fa-user-plus"></i> Add
            </>
          )}
        </button>
        ) : (

          <button
          onClick={handleCancelButton}
          className="btn-add-friend"
          type="button"
          disabled={cancelingRequest}
          style={{
            width: "140px",
            backgroundColor: cancelingRequest ? "#c4c4c4" : "#999999",
            color: cancelingRequest ? "#888" : "white",
            cursor: cancelingRequest ? "not-allowed" : "pointer",
          }}
        >
          {cancelingRequest ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Cancel Request"
          )}
        </button>
        ) }
      </div>
    </div>
  );
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useCancelFriendRequestMutation, useSendFriendRequestMutation } from "../../../services/friendsApi";
import { handleApiError } from "../../handleApiError/handleApiError";
import { setToastSuccess, setRequestSent, setRequestRejected } from "../../home/HomeSlice";

export default function ProfileButton({ friend_state, user_id, type }) {
  const dispatch = useDispatch();

  // Redux selectors for request status
  const requestSent = useSelector((state) => state.home.sentRequests[user_id]);
  const requestRejected = useSelector((state) => state.home.rejectedRequests[user_id]);

  const [sendFriendRequest, { isLoading: sendingRequest }] = useSendFriendRequestMutation();
  const [cancelFriendRequest, { isLoading: cancelingRequest }] = useCancelFriendRequestMutation();

  const handleAddButton = async (e) => {
    e.preventDefault();
    try {
      const res = await sendFriendRequest({ receiver_id: user_id });
      if (res.data) {
        dispatch(setToastSuccess({ toastSuccess: "Friend request sent successfully" }));
        dispatch(setRequestSent({ userId: user_id }));
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  const handleCancelButton = async (e) => {
    e.preventDefault();
    try {
      const res = await cancelFriendRequest({ receiver_id: user_id });
      if (res.data) {
        dispatch(setToastSuccess({ toastSuccess: "Friend request canceled successfully" }));
        dispatch(setRequestRejected({ userId: user_id }));
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  const renderButton = () => {
    switch (type) {
      case "sended":
        return (
          <div className="add-delete-button me-2">
            <button
              onClick={handleCancelButton}
              className="btn-delete-friend"
              type="button"
              style={{
                backgroundColor: cancelingRequest ? "#c4c4c4" : "#d9534f",
                color: cancelingRequest ? "#888" : "white",
                outline: "none",
                boxShadow: "none",
                border: "none",
                cursor: cancelingRequest ? "not-allowed" : "pointer",
              }}
              disabled={cancelingRequest}
            >
              {cancelingRequest ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                "Cancel Request"
              )}
            </button>
          </div>
        );

      case "received":
        return (
          <div className="add-delete-button me-2">
            <button
              onClick={handleCancelButton}
              className="btn-delete-friend"
              type="button"
              style={{
                backgroundColor: cancelingRequest ? "#c4c4c4" : "#d9534f",
                color: cancelingRequest ? "#888" : "white",
                outline: "none",
                boxShadow: "none",
                border: "none",
                cursor: cancelingRequest ? "not-allowed" : "pointer",
              }}
              disabled={cancelingRequest}
            >
              {cancelingRequest ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                "Reject Request"
              )}
            </button>
          </div>
        );

      case "friend":
        return (
          <div className="add-delete-button me-2">
            <button
              onClick={handleCancelButton}
              className="btn-delete-friend"
              type="button"
              style={{
                backgroundColor: cancelingRequest ? "#c4c4c4" : "#d9534f",
                color: cancelingRequest ? "#888" : "white",
                outline: "none",
                boxShadow: "none",
                border: "none",
                cursor: cancelingRequest ? "not-allowed" : "pointer",
              }}
              disabled={cancelingRequest}
            >
              {cancelingRequest ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                "Unfriend"
              )}
            </button>
          </div>
        );

      default:
        return (
          <div className="add-friend-button">
            {requestSent ? (
              <button
                onClick={handleCancelButton}
                className="btn-add-friend btn-primary"
                type="button"
                style={{
                  backgroundColor: cancelingRequest ? "#c4c4c4" : "#999999",
                  color: cancelingRequest ? "#888" : "white",
                  outline: "none",
                  boxShadow: "none",
                  border: "none",
                  fontSize: "14px",
                  minWidth: "135px",
                  cursor: cancelingRequest ? "not-allowed" : "pointer",
                }}
                disabled={cancelingRequest}
              >
                {cancelingRequest ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  "Cancel Request"
                )}
              </button>
            ) : (
              <button
                onClick={handleAddButton}
                className="btn-add-friend btn-primary"
                type="button"
                style={{
                  backgroundColor: sendingRequest ? "#c4c4c4" : "#0d8de5",
                  outline: "none",
                  boxShadow: "none",
                  border: "none",
                }}
                disabled={sendingRequest}
              >
                {sendingRequest ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  <>
                    <i className="fas fa-user-plus"></i> Add
                  </>
                )}
              </button>
            )}
          </div>
        );
    }
  };

  return <div>{renderButton()}</div>;
}

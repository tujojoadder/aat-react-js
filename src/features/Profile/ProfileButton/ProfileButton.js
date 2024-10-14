import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useCancelFriendRequestMutation,
  useSendFriendRequestMutation,
} from "../../../services/friendsApi";
import {
  setToastSuccess,
  setRequestSent,
  setRequestRejected,
} from "../../home/HomeSlice";
import { handleApiError } from "../../handleApiError/handleApiError";

export default function ProfileButton({ user_id, type }) {
  const dispatch = useDispatch();

  const [cancelFriendRequest, { isLoading: cancelingRequest }] =
    useCancelFriendRequestMutation();
  const [sendFriendRequest, { isLoading: sendingRequest }] =
    useSendFriendRequestMutation();

  const [isAddButtonVisible, setAddButtonVisible] = useState(false);

  // Handle canceling a friend request
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
        dispatch(setRequestRejected({ userId: user_id }));
        setAddButtonVisible(true);
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  // Handle sending a friend request
  const handleAddButton = async (e) => {
    e.preventDefault();
    try {
      const res = await sendFriendRequest({ receiver_id: user_id });
      if (res.data) {
        dispatch(
          setToastSuccess({ toastSuccess: "Friend request sent successfully" })
        );
        dispatch(setRequestSent({ userId: user_id }));
        setAddButtonVisible(false);
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  // Set initial button visibility based on the type (friendship status)
  useEffect(() => {
    if (type === "not_friend") {
      setAddButtonVisible(true); // Show "Add Friend" button
    } else if (type === "sended") {
      setAddButtonVisible(false); // Show "Cancel Request" button
    }
  }, [type]);

  return (
    <div>
      {isAddButtonVisible ? (
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
      )}
    </div>
  );
}

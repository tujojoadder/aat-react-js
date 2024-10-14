import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useCancelFriendRequestMutation,
  useSendFriendRequestMutation,
  useManageFriendRequestMutation,
} from "../../../services/friendsApi";
import {
  setToastSuccess,
  setRequestSent,
  setRequestRejected,
  setRequestAccepted,
} from "../../home/HomeSlice";
import { handleApiError } from "../../handleApiError/handleApiError";
import { useUnfriendUserMutation } from "../../../services/profileApi";

export default function ProfileButton({ user_id, type }) {
  const dispatch = useDispatch();
  const [getAddButton, setGetAddButton] = useState(false);
  const [getUnfriend, setGetUnfriend] = useState(false);
  const [unfriendUser, { isLoading, isError, isSuccess, error }] =
    useUnfriendUserMutation();

  // Redux selectors for request status
  const requestSent = useSelector((state) => state.home.sentRequests[user_id]);

  const requestRejected = useSelector(
    (state) => state.home.rejectedRequests[user_id]
  );

  // Mutations
  const [cancelFriendRequest, { isLoading: cancelingRequest }] =
    useCancelFriendRequestMutation();
  const [sendFriendRequest, { isLoading: sendingRequest }] =
    useSendFriendRequestMutation();
  const [manageFriendRequest] = useManageFriendRequestMutation();

  const [isAddButtonVisible, setAddButtonVisible] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  useEffect(() => {
    // Initially show the add button if request has been canceled or not sent
    setAddButtonVisible(!requestSent && !requestRejected);
  }, [requestSent, requestRejected]);

  // Handle Add Friend button
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

  // Handle Cancel Request button
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

  // Handle Accept Request button
  const handleAcceptRequest = async (e) => {
    e.preventDefault();
    setAcceptLoading(true);
    try {
      const res = await manageFriendRequest({
        sender_id: user_id,
        decision: "accepted",
      }).unwrap();
      if (res.data) {
        setGetAddButton(false);
        setGetUnfriend(true);
        dispatch(
          setToastSuccess({ toastSuccess: "Friend added successfully" })
        );

        dispatch(setRequestAccepted({ userId: user_id }));
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    } finally {
      setAcceptLoading(false);
    }
  };

  // Handle Reject Request button
  const handleRejectRequest = async (e) => {
    e.preventDefault();
    setRejectLoading(true);
    try {
      const res = await manageFriendRequest({
        sender_id: user_id,
        decision: "rejected",
      }).unwrap();
      if (res.data) {
        dispatch(setToastSuccess({ toastSuccess: "Friend request rejected" }));
        dispatch(setRequestRejected({ userId: user_id }));

        setGetUnfriend(false);
        setGetAddButton(true);
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    } finally {
      setRejectLoading(false);
    }
  };

  const handleUnfriend = async () => {
    console.log("Unfriending user with ID:", user_id); // Log the user ID
    try {
      await unfriendUser({ useridtoremove: user_id }).unwrap(); // Pass the user ID in an object
      setGetUnfriend(false);
      setGetAddButton(true);
      console.log("Unfriended successfully");
    } catch (err) {
      console.error("Failed to unfriend:", err);
      // Optionally, you can dispatch an error message to show in the UI
    }
  };

  /* type === "received" */

  // Determine button display based on request type or sent status
  if (type === "received") {
    // Render Confirm/Reject buttons for received requests

    if (type === "received" && !getAddButton && !getUnfriend) {
      return (
        <div className="d-flex">
          <button
            className="btn btn-reject-friend me-2"
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
              "Reject"
            )}
          </button>
          <button
            className="btn btn-add-friend"
            onClick={handleAcceptRequest}
            disabled={acceptLoading}
          >
            {acceptLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      );
    } else if (type === "received" && getAddButton) {
      if (requestSent) {
        return (
          <button
            onClick={handleCancelButton}
            className="btn-cancel-request"
            type="button"
            disabled={cancelingRequest}
            style={{
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
        );
      } else {
        return (
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
        );
      }
    } else {
      return (
        <button
          onClick={handleUnfriend}
          className="btn-add-friend"
          type="button"
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
              <i className="fas fa-user-minus"></i> Unfriend
            </>
          )}
        </button>
      );
    }

    /* type === "sended" */
  } else if (type === "sended") {
    // Render Cancel button if request has been sent

    return !requestRejected ? (
      <button
        onClick={handleCancelButton}
        className="btn-cancel-request"
        type="button"
        disabled={cancelingRequest}
        style={{
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
    ) : (
      <>
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
      </>
    );
  } else if (type === "not_friend") {

  /*  Not Friend */
    return requestSent ? (
      <button
        onClick={handleCancelButton}
        className="btn-cancel-request"
        type="button"
        disabled={cancelingRequest}
        style={{
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
    ) : (
      <>
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
      </>
    );
  } 
  
 /*  friend */

  
  else {
    // Render Add Friend button for non-friends
    return (
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
    );
  }
}

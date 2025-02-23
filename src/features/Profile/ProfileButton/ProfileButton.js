import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useCancelFriendRequestMutation,
  useSendFriendRequestMutation,
  useManageFriendRequestMutation,
  useUnfriendUserMutation,
} from "../../../services/friendsApi";
import {
  setToastSuccess,
  setRequestSent,
  setRequestRejected,
  setRequestAccepted,
  setRequestCancel,
} from "../../home/HomeSlice";
import { handleApiError } from "../../handleApiError/handleApiError";
import "./ProfileButton.css";
import { useParams } from "react-router-dom";

export default function ProfileButton({ type }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [unfriendUser, { isLoading:unFriending, isError, isSuccess, error }] =
    useUnfriendUserMutation();
  // Redux selectors for request status

  const sentRequests = useSelector((state) => state.home.sentRequests[id]);
  const cancelRequests = useSelector((state) => state.home.cancelRequests[id]);
  const acceptedRequests = useSelector((state) => state.home.acceptedRequests[id]);
  const rejectedRequests = useSelector((state) => state.home.rejectedRequests[id]);


  // Mutations
  const [cancelFriendRequest, { isLoading: cancelingRequest }] =
    useCancelFriendRequestMutation();
  const [sendFriendRequest, { isLoading: sendingRequest }] =
    useSendFriendRequestMutation();
  const [manageFriendRequest] = useManageFriendRequestMutation();

  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  // Handle Add Friend button
  const handleAddButton = async (e) => {
    e.preventDefault();
    try {
      const res = await sendFriendRequest({ receiver_id: id });
      if (res.data) {
        dispatch(
          setToastSuccess({ toastSuccess: "Friend request sent successfully" })
        );
        dispatch(setRequestSent({ userId: id }));
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
      const res = await cancelFriendRequest({ receiver_id: id });
      if (res.data) {
        dispatch(
          setToastSuccess({
            toastSuccess: "Friend request canceled successfully",
          })
        );
        dispatch(setRequestCancel({ userId: id }));
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
        sender_id: id,
        decision: "accepted",
      }).unwrap();
      dispatch(setToastSuccess({ toastSuccess: "Friend added successfully" }));
      dispatch(setRequestAccepted({ userId: id }));
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
        sender_id: id,
        decision: "rejected",
      }).unwrap();

      dispatch(setToastSuccess({ toastSuccess: "Friend request rejected" }));
      dispatch(setRequestRejected({ userId: id }));
    } catch (error) {
      handleApiError(error, dispatch);
    } finally {
      setRejectLoading(false);
    }
  };
  /*<<--->> if we unfriend anyone we will treat them as cancelRequests  */
  const handleUnfriend = async () => {
    console.log("Unfriending user with ID:", id); // Log the user ID
    try {
      await unfriendUser({ useridtoremove: id }).unwrap(); // Pass the user ID in an object
      /*<<--->> if we unfriend anyone we will treat them as cancelRequests  */
      dispatch(setRequestCancel({ userId: id }));
      console.log("Unfriended successfully");
    } catch (err) {
      console.error("Failed to unfriend:", err);
      // Optionally, you can dispatch an error message to show in the UI
    }
  };
  console.log("type " + type);
  // User has recived a request

  if (
    sentRequests === true ||
    cancelRequests === true ||
    acceptedRequests === true ||
    rejectedRequests === true
  ) {
    if (sentRequests === true) {
      return (
        <button
          onClick={handleCancelButton}
          className="btn-cancel-request p-1 button-size"
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
    } else if (cancelRequests === true) {
      return (
        <button
          onClick={handleAddButton}
          className=" p-1 px-2 button-size "
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
    } else if (acceptedRequests === true) {
      return (
        <button
          onClick={handleUnfriend}
          className=" p-1 px-2 button-size"
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
    } else if (rejectedRequests === true) {
      return (
        <button
          onClick={handleAddButton}
          className=" p-1 px-2 button-size"
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
    if (type === "received") {
      return (
        <div className="d-flex">
          <button
            className="btn btn-reject-friend me-2 button-size"
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
            className="btn  p-1 px-2 button-size"
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

      /* type === "sended" */
    } else if (type === "sended") {
      // Render Cancel button if request has been sent
      return (
        <button
          onClick={handleCancelButton}
          className="btn-cancel-request p-1 button-size"
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
    } else if (type === "not_friend") {
      /*  Not Friend */
      return (
        <>
          <button
            onClick={handleAddButton}
            className=" p-1 px-2 button-size"
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
    } else if (type === "friend") {
      /*  friend */
      // Render Add Friend button for non-friends
      /* handling with state  */
      return (
        <button
          onClick={handleUnfriend}
          className=" p-1 px-2 button-size"
          type="button"
          style={{
            backgroundColor: unFriending ? "#c4c4c4" : "#0d8de5",
            cursor: unFriending ? "not-allowed" : "pointer",
          }}
        >
          {unFriending ? (
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
  }
}

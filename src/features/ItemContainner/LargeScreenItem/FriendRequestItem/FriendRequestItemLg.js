import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useManageFriendRequestMutation } from "../../../../services/friendsApi";
import { handleApiError } from "../../../handleApiError/handleApiError";
import { setToastSuccess, setRequestAccepted, setRequestRejected } from "../../../home/HomeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function FriendRequestItemLg(props) {
  const dispatch = useDispatch();
  
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  // Access accepted and rejected requests from Redux state
  const acceptedRequests = useSelector((state) => state.home.acceptedRequests);
  const rejectedRequests = useSelector((state) => state.home.rejectedRequests);

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
        sender_id: props.user_id,
        decision: "accepted",
      }).unwrap();
      if (res.data) {
        dispatch(setToastSuccess({ toastSuccess: "Friend added successfully" }));
        dispatch(setRequestAccepted({ userId: props.user_id })); // Update Redux state
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
        sender_id: props.user_id,
        decision: "rejected",
      }).unwrap();
      if (res.data) {
        dispatch(setToastSuccess({ toastSuccess: "Friend request rejected" }));
        dispatch(setRequestRejected({ userId: props.user_id })); // Update Redux state
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
  const isRequestAccepted = acceptedRequests[props.user_id];
  const isRequestRejected = rejectedRequests[props.user_id];

  return (
    <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
      <div className="card shadow-sm border-0 rounded">
        <div
          className="card-body border rounded p-0 pb-3"
          style={{ overflow: "hidden", height: "auto" }}
        >
          <NavLink
            key={props.user_id}
            to={`/friends/requests/${props.user_id}`}
            className="text-decoration-none"
          >
            <img
              src={props.image}
              style={{ height: "20vh", minHeight: "9rem" }}
              alt=""
              className="w-100 card-img-top border-bottom"
            />
          </NavLink>

          <div className="pt-3 px-2">
            <h5 className="mb-0 text-truncate">{props.name}</h5>
            <p className="small text-muted text-truncate">{props.handle}</p>
            <div className="d-flex flex-column me-3 ms-1">
              {!isRequestAccepted && !isRequestRejected ? (
                <>
                  <button
                    onClick={handleAcceptRequest}
                    className="btn btn-md btn-primary mb-2 py-2 w-100"
                    disabled={acceptLoading}
                  >
                    {acceptLoading ? (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <b>Confirm</b>
                    )}
                  </button>

                  <button
                    onClick={handleRejectRequest}
                    className="btn py-2 btn-md w-100"
                    style={{ backgroundColor: "#ebedf0" }}
                    disabled={rejectLoading}
                  >
                    {rejectLoading ? (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <b>Delete</b>
                    )}
                  </button>
                </>
              ) : isRequestAccepted ? (
                <button
                  className="btn py-2 btn-md w-100"
                  style={{ backgroundColor: "#28a745", color: "white" }}
                  disabled
                >
                  <b>Request Accepted</b>
                </button>
              ) : (
                <button
                  className="btn py-2 btn-md w-100"
                  style={{ backgroundColor: "#dc3545", color: "white" }}
                  disabled
                >
                  <b>Request Rejected</b>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

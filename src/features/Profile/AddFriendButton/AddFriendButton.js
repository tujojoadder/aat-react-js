import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleApiError } from '../../handleApiError/handleApiError';
import { useCancelFriendRequestMutation, useSendFriendRequestMutation } from '../../../services/friendsApi';
import { setToastSuccess, setRequestSent, setRequestRejected } from '../../home/HomeSlice';

export default function AddFriendButton({ user_id }) {
  const dispatch = useDispatch();

  // Redux selectors for request status
  const requestSent = useSelector(state => state.home.sentRequests[user_id]);
  const requestRejected = useSelector(state => state.home.rejectedRequests[user_id]);

  // API mutations for sending and canceling friend requests
  const [sendFriendRequest, { isLoading: sendingRequest }] = useSendFriendRequestMutation();
  const [cancelFriendRequest, { isLoading: cancelingRequest }] = useCancelFriendRequestMutation();

  // Handle the "Add Friend" button click
  const handleAddButton = async (e) => {
    e.preventDefault();
    try {
      const res = await sendFriendRequest({ receiver_id: user_id });
      if (res.data) {
        dispatch(setToastSuccess({ toastSuccess: 'Friend request sent successfully' }));
        dispatch(setRequestSent({ userId: user_id }));
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  // Handle the "Cancel Request" button click
  const handleCancelButton = async (e) => {
    e.preventDefault();
    try {
      const res = await cancelFriendRequest({ receiver_id: user_id });
      if (res.data) {
        dispatch(setToastSuccess({ toastSuccess: 'Friend request canceled successfully' }));
        dispatch(setRequestRejected({ userId: user_id }));
      } else if (res.error) {
        handleApiError(res.error, dispatch);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };

  return (
    <div className="d-flex align-items-center">
      {/* Conditionally render Add or Cancel button based on request status */}
      {requestSent ? (
        <div
          className="btn btn-md btn-secondary mx-1 d-flex align-items-center px-2"
          style={{ cursor: cancelingRequest ? "not-allowed" : "pointer" }}
          onClick={handleCancelButton}
          disabled={cancelingRequest}
        >
          {cancelingRequest ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            <>
              <i className="fa-solid fa-user-minus text-white"></i>
              <span className="ms-1">Cancel Request</span>
            </>
          )}
        </div>
      ) : (
        <div
          className="btn btn-md btn-primary mx-1 d-flex align-items-center px-2"
          style={{ cursor: sendingRequest ? "not-allowed" : "pointer" }}
          onClick={handleAddButton}
          disabled={sendingRequest}
        >
          {sendingRequest ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            <>
              <i className="fa-solid fa-user-plus text-white"></i>
              <span className="ms-1">Add Friend</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

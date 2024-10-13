import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleApiError } from '../../../handleApiError/handleApiError';
import { useCancelFriendRequestMutation, useSendFriendRequestMutation } from '../../../../services/friendsApi';
import { setToastSuccess, setRequestSent, setRequestRejected } from '../../../home/HomeSlice';
import './SuggestionItemSm.css';

export default function SuggestionItemSm({
  name,
  user_id,
  handle,
  image,
  isActive,
  type,
}) {
  const dispatch = useDispatch();

  // Redux selectors for request status
  const requestSent = useSelector(state => state.home.sentRequests[user_id]);
  const requestRejected = useSelector(state => state.home.rejectedRequests[user_id]);

  const [sendFriendRequest, { isLoading: sendingRequest }] = useSendFriendRequestMutation();
  const [cancelFriendRequest, { isLoading: cancelingRequest }] = useCancelFriendRequestMutation();

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

  const renderButton = () => {
   
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
    
  };

  return (
    <div
      className={`friend-request-container px-3 d-flex align-items-center mt-2 py-2 shadow-sm rounded ${isActive ? "active" : ""}`}
      style={{ maxWidth: '100%', overflowX: 'hidden' }}
    >
      <div className="profile-image me-2">
        <NavLink
          key={user_id}
          to={`/friends/suggestions/${user_id}`}
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
      {renderButton()}
    </div>
  );
}

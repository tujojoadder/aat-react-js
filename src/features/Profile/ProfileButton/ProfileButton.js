import React from 'react'
import { setRequestRejected, setRequestSent, setToastSuccess } from '../../home/HomeSlice';
import { useCancelFriendRequestMutation, useSendFriendRequestMutation } from '../../../services/friendsApi';
import { useDispatch, useSelector } from 'react-redux';
import { handleApiError } from '../../handleApiError/handleApiError';

export default function ProfileButton({  user_id, type }) {
/* Add and Cancel  */
const dispatch = useDispatch();

  // Redux selectors for request status
  const rejectedRequests = useSelector(state => state.home.rejectedRequests[user_id]);
  const acceptedRequests = useSelector(state => state.home.acceptedRequests[user_id]);
  const sentRequests = useSelector(state => state.home.sentRequests[user_id]);

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
    if (type == 'not_friend' || type=='sended' ) {
      return (
        <>
          <div className="add-friend-button">
          {sentRequests || type=='sended' ? (
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
        </>
      );
    } else {
      return (
        <></>
      );
    }
  };

  return (
   <> {renderButton()}</>
  )
}

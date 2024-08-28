import React from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleApiError } from '../../../handleApiError/handleApiError';
import { useCancelFriendRequestMutation, useSendFriendRequestMutation } from '../../../../services/friendsApi';
import { setToastSuccess, setRequestSent, setRequestRejected } from '../../../home/HomeSlice';

export default function SuggestionItemLg({ name, handle, image, user_id }) {
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

    const getButton = () => {
        if (requestSent && !requestRejected) {
            return (
                <button
                    onClick={handleCancelButton}
                    className="btn btn-md btn-danger py-2 w-100"
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
            );
        }

        return (
            <button
                onClick={handleAddButton}
                className="btn btn-md btn-primary py-2 w-100"
                type="button"
                style={{
                    backgroundColor: sendingRequest ? "#c4c4c4" : "#0275d8",
                    color: sendingRequest ? "#888" : "white",
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                    cursor: sendingRequest ? "not-allowed" : "pointer",
                }}
                disabled={sendingRequest}
            >
                {sendingRequest ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                    <>
                        <i className="fas fa-user-plus me-2"></i> Add Friend
                    </>
                )}
            </button>
        );
    };

    return (
        <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
            <div className="card shadow-sm border-0 rounded">
                <div className="card-body border rounded p-0 pb-3" style={{ overflow: "hidden", height: "auto" }}>
                    <NavLink
                        key={user_id}
                        to={`/friends/suggestions/${user_id}`}
                        className="text-decoration-none"
                    >
                        <img src={image} style={{ height: '20vh', minHeight: '9rem' }} alt="" className="w-100 card-img-top border-bottom" />
                    </NavLink>
                    <div className="pt-3 px-2">
                        <h5 className="mb-0 text-truncate">{name}</h5>
                        <p className="small text-muted text-truncate">{handle}</p>
                        <div className="d-flex flex-column me-3 ms-1">
                            {getButton()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

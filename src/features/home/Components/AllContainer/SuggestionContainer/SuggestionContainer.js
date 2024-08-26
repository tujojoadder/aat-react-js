import React, { useState } from "react";
import "./SuggestionContainer.css";
import { NavLink } from "react-router-dom";
import { useCancelFriendRequestMutation, useSendFriendRequestMutation } from "../../../../../services/friendsApi";
import { handleApiError } from "../../../../handleApiError/handleApiError";
import { useDispatch } from "react-redux";
import { setToastSuccess } from "../../../HomeSlice";

export default function SuggestionContainer({ name, handle, image, isActive, user_id }) {
    const dispatch = useDispatch();
    const [requestSent, setRequestSent] = useState(false);
    const [requestCanceled, setRequestCanceled] = useState(false);

    const [SendFriendRequestMutation, { isLoading: sendingRequest }] = useSendFriendRequestMutation();
    const [CancelFriendRequestMutation, { isLoading: cancelingRequest }] = useCancelFriendRequestMutation();

    const handleAddButton = async (e) => {
        e.preventDefault();
        try {
            const res = await SendFriendRequestMutation({ receiver_id: user_id });
            if (res.data) {
                dispatch(setToastSuccess({ toastSuccess: 'Sent request successfully' }));
                setRequestSent(true);
                setRequestCanceled(false); // Reset cancel state if request is sent again
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
            const res = await CancelFriendRequestMutation({ receiver_id: user_id });
            if (res.data) {
                dispatch(setToastSuccess({ toastSuccess: 'Request canceled successfully' }));
                setRequestSent(false);
                setRequestCanceled(true);
            } else if (res.error) {
                handleApiError(res.error, dispatch);
            }
        } catch (error) {
            handleApiError(error, dispatch);
        }
    };

    const getButton = () => {
        if (requestSent && !requestCanceled) {
            return (
                <button
                    onClick={handleCancelButton}
                    className="btn-add-friend btn-primary"
                    type="button"
                    style={{
                        backgroundColor: cancelingRequest ? "#c4c4c4" : "#999999", // Black background for cancel button
                        color: cancelingRequest ? "#888" : "white",
                        outline: "none",
                        boxShadow: "none",
                        border: "none",
                        fontSize: "14px",
                        minWidth: "126px",
                        cursor: cancelingRequest ? "not-allowed" : "pointer",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    disabled={cancelingRequest}
                >
                    {cancelingRequest ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        "Cancel request"
                    )}
                </button>
            );
        }

        if (requestCanceled) {
            return (
                <button
                    onClick={handleAddButton}
                    className="btn-add-friend btn-primary"
                    type="button"
                    style={{
                        backgroundColor: sendingRequest ? "#c4c4c4" : "#274a65",
                        color: sendingRequest ? "#888" : "white",
                        outline: "none",
                        boxShadow: "none",
                        border: "none",
                        cursor: sendingRequest ? "not-allowed" : "pointer",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    disabled={sendingRequest}
                >
                    {sendingRequest ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        <>
                            <i className="fas fa-user-plus me-2"></i> Add
                        </>
                    )}
                </button>
            );
        }

        return (
            <button
                onClick={handleAddButton}
                className="btn-add-friend btn-primary"
                type="button"
                style={{
                    backgroundColor: sendingRequest ? "#c4c4c4" : "#274a65",
                    color: sendingRequest ? "#888" : "white",
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                    cursor: sendingRequest ? "not-allowed" : "pointer",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                disabled={sendingRequest}
            >
                {sendingRequest ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                    <>
                        <i className="fas fa-user-plus me-2"></i> Add
                    </>
                )}
            </button>
        );
    };

    return (
        <div
            className={`friend-request-container p-2 d-flex align-items-center mt-2 py-2 shadow-sm rounded ${
                isActive ? "active" : ""
            }`}
            style={{ maxWidth: "100%" }}
        >
            <div className="profile-image me-2">
                <NavLink
                    key={user_id}
                    to={`/profile/${user_id}`}
                    className="text-decoration-none"
                >
                    <img
                        className="rounded-circle"
                        src={`${image}`}
                        alt="user"
                        height="50px"
                        width="50px"
                    />
                </NavLink>
            </div>
            <div className="profile-info flex-grow-1">
                <p className="fw-bold mb-0 text-truncate">{name}</p>
                <p className="text-muted mb-0 text-truncate">{handle}</p>
            </div>

            <div className="add-friend-button">
                {getButton()}
            </div>
        </div>
    );
}

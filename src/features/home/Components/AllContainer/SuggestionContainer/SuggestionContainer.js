import React from "react";
import "./SuggestionContainer.css";
import { NavLink } from "react-router-dom";
import { useSendFriendRequestMutation } from "../../../../../services/friendsApi";
import { handleApiError } from "../../../../handleApiError/handleApiError";
import { useDispatch } from "react-redux";
import { setToastSuccess } from "../../../HomeSlice";

export default function SuggestionContainer({ name, handle, image, isActive, user_id, is_friend }) {
    const dispatch = useDispatch();

    const [
        SendFriendRequestMutation,
        {
            isSuccess: useSendFriendRequestMutationSucess,
            isLoading: useSendFriendRequestMutationLoading,
            isError: useSendFriendRequestMutationError,
            isFetching: useSendFriendRequestMutationisFetching,
            refetch: useSendFriendRequestMutationrefetch,
        },
    ] = useSendFriendRequestMutation();

    const handleAddButton = async (e) => {
        e.preventDefault();
        try {
            const res = await SendFriendRequestMutation({ receiver_id: user_id });
            if (res.data) {
                dispatch(setToastSuccess({ toastSuccess: 'Sended request successfully' }));
            } else if (res.error) {
                handleApiError(res.error, dispatch);
            }
        } catch (error) {
            handleApiError(error, dispatch);
        }
    };

    return (
        <div
            className={`friend-request-container p-2  d-flex align-items-center mt-2 py-2 shadow-sm rounded ${
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
                {/* Show button based on states */}
                {!is_friend && !useSendFriendRequestMutationSucess && (
                    <button
                        onClick={handleAddButton}
                        className="btn-add-friend btn-primary"
                        type="button"
                        style={{
                            backgroundColor: useSendFriendRequestMutationLoading ? "#c4c4c4" : "#274a65", // Change color when loading
                            color: useSendFriendRequestMutationLoading ? "#888" : "white", // Change text color when loading
                            outline: "none",
                            boxShadow: "none",
                            border: "none",
                            cursor: useSendFriendRequestMutationLoading ? "not-allowed" : "pointer", // Show not-allowed cursor when loading
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        disabled={useSendFriendRequestMutationLoading} // Disable button when loading
                    >
                        {useSendFriendRequestMutationLoading ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            <>
                                <i className="fas fa-user-plus me-2"></i> Add
                            </>
                        )}
                    </button>
                )}

                {/* Show Cancel Request button after friend request is sent */}
                {useSendFriendRequestMutationSucess && (
                    <button
                        className="btn-add-friend btn-primary"
                        type="button"
                        style={{
                            backgroundColor: "#e4e6eb",
                            color: "black",
                            outline: "none",
                            boxShadow: "none",
                            border: "none",
                            fontSize: "14px",
                            minWidth: "126px",
                        }}
                    >
                        Cancel request
                    </button>
                )}
            </div>
        </div>
    );
}

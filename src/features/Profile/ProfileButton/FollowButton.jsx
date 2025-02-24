import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToggoleUserFollowMutation } from "../../../services/profileApi";
import { setFollowing, setUnFollowing } from "../../home/HomeSlice";

function FollowButton({ userId, is_following }) {
  const dispatch = useDispatch();
  const [toggleFollow, { isLoading, isError, error }] =
    useToggoleUserFollowMutation();

  const isFollowing = useSelector((state) => state.home.isFollowing[userId]);

  const handleToggleFollow = async () => {
    try {
      const res = await toggleFollow({ userId }).unwrap();
      if (res.message === "follow") {
        dispatch(setFollowing({ userId: userId }));
      } else {
        dispatch(setUnFollowing({ userId: userId }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isFollowing === true ? (
        <button
          className="button-size"
          style={styles.unFollowButton}
          onClick={handleToggleFollow}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner"></span>
          ) : (
            <span style={styles.unFollowButtonText}>
              <i className="fas fa-user-minus"></i> Unfollow
            </span>
          )}
        </button>
      ) : isFollowing === false ? (
        <button
          className="button-size"
          style={styles.followButton}
          onClick={handleToggleFollow}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner"></span>
          ) : (
            <span style={styles.followButtonText}>
              <i className="fas fa-user-plus"></i> Follow
            </span>
          )}
        </button>
      ) : is_following === true ? (
        <button
          className="button-size"
          style={styles.unFollowButton}
          onClick={handleToggleFollow}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner"></span>
          ) : (
            <span style={styles.unFollowButtonText}>
              <i className="fas fa-user-minus"></i> Unfollow
            </span>
          )}
        </button>
      ) : (
        <button
          className="button-size"
          style={styles.followButton}
          onClick={handleToggleFollow}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner"></span>
          ) : (
            <span style={styles.followButtonText}>
              <i className="fas fa-user-plus"></i> Follow
            </span>
          )}
        </button>
      )}
    </>
  );
}

// Styles
const styles = {
  followButton: {
    backgroundColor: "#007bff", // Blue background for follow button
    borderRadius: "5px",
    border: "none",
    color: "white", // White text for follow button
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px", // Space between icon and text
  },
  followButtonText: {
    color: "white",
  },
  unFollowButton: {
    backgroundColor: "#e8dddc", // Gray background for unfollow button
    borderRadius: "5px",
    border: "none",
    color: "black", // Black text for unfollow button
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px", // Space between icon and text
  },
  unFollowButtonText: {
    color: "black",
  },
};

export default FollowButton;
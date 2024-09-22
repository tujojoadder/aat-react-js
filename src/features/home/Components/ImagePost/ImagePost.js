import React, { useEffect, useRef, useState } from "react";
import TextComment from "../TextComment/TextComment";
import Comment from "../Comment/Comment/Comment";
import CommentedImage from "../../../CommentedMedia/CommentedImage/CommentedImage";
import "./ImagePost.css";
import { formatPostDate } from "../../../../utils/dateUtils";
import ImagePostSkeleton from "./ImagePostSkeleton/ImagePostSkeleton";
import { useToggleLoveMutation } from "../../../../services/loveApi";
import { useToggleUnlikeMutation } from "../../../../services/unlikeApi";
import { setLoveReaction, setUnlikeReactions } from "../../HomeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ImagePost({ post }) {
  const dispatch = useDispatch();
  // Redux selectors for request status
  const loveReactions = useSelector(state => state.home.loveReactions[post.post_id]);
  const unlikeReactions = useSelector(state => state.home.unlikeReactions[post.post_id]);

useEffect(() => {
 
if (post.isLove) {
  dispatch(setLoveReaction({ postId: post.post_id }));
}
if (post.isUnlike) {
  dispatch(setUnlikeReactions({ postId: post.post_id })); // Revert if necessary

}

}, [])


  const [isXSmall, setIsXSmall] = useState(window.innerWidth <= 650);
  const [isSmall, setIsSmall] = useState(
    window.innerWidth > 650 && window.innerWidth <= 950
  );
  const [isMid, setIsMid] = useState(
    window.innerWidth > 950 && window.innerWidth <= 1200
  );
  const [isLg, setIsLg] = useState(window.innerWidth > 1200);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isProfilePicLoaded, setIsProfilePicLoaded] = useState(false);

  const modalRef = useRef(null);

  const [toggleLove] = useToggleLoveMutation();
  const [toggleUnlike] = useToggleUnlikeMutation();

  const updateWidth = () => {
    setIsXSmall(window.innerWidth <= 650);
    setIsSmall(window.innerWidth > 650 && window.innerWidth <= 950);
    setIsMid(window.innerWidth > 950 && window.innerWidth <= 1200);
    setIsLg(window.innerWidth > 1200);
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  // Update state for modal open/close
  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener("shown.bs.modal", () =>
        setIsModalOpen(true)
      );
      modalElement.addEventListener("hidden.bs.modal", () =>
        setIsModalOpen(false)
      );
      return () => {
        modalElement.removeEventListener("shown.bs.modal", () =>
          setIsModalOpen(true)
        );
        modalElement.removeEventListener("hidden.bs.modal", () =>
          setIsModalOpen(false)
        );
      };
    }
  }, []);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleProfilePicLoad = () => {
    setIsProfilePicLoaded(true);
  };

  const handleLoveClick = async () => {
    // Optimistic update
    dispatch(setLoveReaction({ postId: post.post_id }));
    
    try {
      await toggleLove({ loveOnType: "post", loveOnId: post.post_id });
    } catch (error) {
      console.error("Failed to toggle love:", error);
      dispatch(setUnlikeReactions({ postId: post.post_id })); // Revert if necessary
    }
  };

  const handleUnlikeClick = async () => {
    // Optimistic update
    dispatch(setUnlikeReactions({ postId: post.post_id }));

    try {
      await toggleUnlike({ unlikeOnType: "post", unlikeOnId: post.post_id });
    } catch (error) {
      console.error("Failed to toggle unlike:", error);
      dispatch(setLoveReaction({ postId: post.post_id })); // Revert if necessary
    }
  };

  return (
    <div className="posts mx-2">
      {!post ? (
        <ImagePostSkeleton />
      ) : (
        <>
          <div className="user-pics">
            {!isProfilePicLoaded && (
              <div className="profile-pic-skeleton">
                <div
                  className="skeleton-box ms-2 me-1"
                  style={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#e5e5e5",
                  }}
                ></div>
              </div>
            )}
            <img
              src={`${post.author.profile_picture}`}
              alt="user-profile"
              onLoad={handleProfilePicLoad}
              style={{ display: isProfilePicLoaded ? "block" : "none" }}
            />
          </div>
          <div className="user-contents-image-box">
            <div className="user-names-text pb-1">
              <div className="name-column">
                <h1 className="full-name-text m-0 p-0">
                  {post.author.user_fname} {post.author.user_lname}
                </h1>
                <p className="user-name-text m-0 p-0">
                  @{post.author.identifier}
                </p>
              </div>
              <p className="time-text ms-3">
                {formatPostDate(post.created_at)}
              </p>
            </div>

            <div className="user-contents">
              {!isImageLoaded && (
                <div className="image-skeleton">
                  <div
                    className="skeleton-box"
                    style={{
                      height: "300px",
                      width: "100%",
                      backgroundColor: "#e5e5e5",
                      borderRadius: "15px",
                    }}
                  ></div>
                </div>
              )}
              <div
                className="bImageContainer"
                style={{ display: isImageLoaded ? "block" : "none" }}
              >
                <img
                  className="bImage"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    maxHeight: "500px",
                  }}
                  src={`${post.image_post.post_url}`}
                  alt="post-content"
                  onLoad={handleImageLoad}
                />
              </div>
            </div>
            <div className="content-icons px-2">
              <i
                className={`far fa-heart ${loveReactions  ? "fas red-heart" : ""}`}
                onClick={handleLoveClick}
              >
                <span className="ps-1">109</span>
              </i>
              <i
                className={`far fa-thumbs-down ${unlikeReactions ? "fas black-unlike" : ""}`}
                onClick={handleUnlikeClick}
              >
                <span className="ps-1">109</span>
              </i>
              <i
                className="ps-md-3 far fa-comment blue"
                data-bs-toggle="modal"
                data-bs-target="#imageModal"
              >
                {" "}
                1.6k
              </i>
              <i className="fa-solid fa-chevron-up ps-md-3 pe-4"></i>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

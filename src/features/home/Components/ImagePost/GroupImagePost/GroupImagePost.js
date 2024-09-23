
import React, { useEffect, useRef, useState } from "react";

import "./GroupImagePost.css";
import { formatPostDate } from "../../../../../utils/dateUtils";
import ImagePostSkeleton from "../ImagePostSkeleton/ImagePostSkeleton";
import CommentedImage from "../../../../CommentedMedia/CommentedImage/CommentedImage";
import TextComment from "../../TextComment/TextComment";
import Comment from "../../Comment/Comment/Comment";
import { useToggleLoveMutation } from "../../../../../services/loveApi";
import { useToggleUnlikeMutation } from "../../../../../services/unlikeApi";
import { useDispatch, useSelector } from "react-redux";
import { setLoveReaction, setUnlikeReactions } from "../../../HomeSlice";

export default function GroupImagePost({ post }) {


/*   Love and Unlike  */

const [toggleLove] = useToggleLoveMutation();
const [toggleUnlike] = useToggleUnlikeMutation();

const dispatch = useDispatch();
// Redux selectors for request status
const loveReactions = useSelector(
  (state) => state.home.loveReactions[post.post_id]
);
const unlikeReactions = useSelector(
  (state) => state.home.unlikeReactions[post.post_id]
);

useEffect(() => {
  if (post.isLove) {
    dispatch(setLoveReaction({ postId: post.post_id, isActive: true })); // Activate love reaction
  }
  if (post.isUnlike) {
    dispatch(setUnlikeReactions({ postId: post.post_id, isActive: true })); // Activate unlike reaction
  }
}, []);
const handleLoveClick = async () => {
  // Optimistic update

  if (loveReactions) {
    dispatch(setLoveReaction({ postId: post.post_id, isActive: false }));
  } else {
    dispatch(setLoveReaction({ postId: post.post_id, isActive: true })); // Activate love reaction
  }

  try {
    await toggleLove({ loveOnType: "post", loveOnId: post.post_id });
  } catch (error) {
    console.error("Failed to toggle love:", error);
  }
};

const handleUnlikeClick = async () => {
  // Optimistic update

  if (unlikeReactions) {
    dispatch(setUnlikeReactions({ postId: post.post_id, isActive: false })); // Activate unlike reaction
  } else {
    dispatch(setUnlikeReactions({ postId: post.post_id, isActive: true })); // Activate unlike reaction
  }

  try {
    await toggleUnlike({ unlikeOnType: "post", unlikeOnId: post.post_id });
  } catch (error) {
    console.error("Failed to toggle unlike:", error);
  }
};






  const [isXSmall, setIsXSmall] = useState(window.innerWidth <= 650);
  const [isSmall, setIsSmall] = useState(
    window.innerWidth > 650 && window.innerWidth <= 950
  );
  const [isMid, setIsMid] = useState(
    window.innerWidth > 950 && window.innerWidth <= 1200
  );
  const [isLg, setIsLg] = useState(window.innerWidth > 1200);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* Image load handling  */
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isProfilePicLoaded, setIsProfilePicLoaded] = useState(false); // State to track profile picture load

  const modalRef = useRef(null);

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

  /* handle image loaded or not  */
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleProfilePicLoad = () => {
    setIsProfilePicLoaded(true);
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

            {/* Group Cover Photo */}
            <img
              src={`${post.group.group_picture}`}
              alt="user-profile"
              onLoad={handleProfilePicLoad}
              style={{
                display: isProfilePicLoaded ? "block" : "none",
                height: "50px",
                width: "50px",
                borderRadius: "15%",
              
              }}
            />
            {/*   User Image */}

            <img
              src={`${post.author.profile_picture}`}
              alt="user-profile"
              onLoad={handleProfilePicLoad}
              style={{
                display: isProfilePicLoaded ? "block" : "none",
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                position:'relative',
                top:'-25px',
                left:'25px'
               
              }}
            />
          </div>
          <div className="user-contents-image-box">
            <div className="user-names-text pb-1">
              <div className="name-column">


               {/*  Group Name */}
                <h1 className="full-name-text m-0 p-0">
                  {post.group.group_name}
                </h1>

               {/*  User Identifire */}
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
                className={`far fa-heart ${
                  loveReactions ? "fas red-heart" : ""
                }`}
                onClick={handleLoveClick}
              >
                <span className="ps-1">{post.totalLove}</span>
              </i>
              <i
                className={`far fa-thumbs-down ${
                  unlikeReactions ? "fas black-unlike" : ""
                }`}
                onClick={handleUnlikeClick}
              >
                <span className="ps-1">{post.totalUnlike}</span>
              </i>
              <i className="ps-md-3 far fa-comment blue"> 1.6k</i>
              <i className="fa-solid fa-chevron-up ps-md-3 pe-4"></i>
            </div>
          </div>

          {/* Modal */}
          <div
            className="modal fade"
            id="imageModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            ref={modalRef}
            style={{ overflowY: "hidden" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header shadow-sm p-3 bg-body rounded">
                  <h5 className="modal-title fs-5" id="exampleModalLabel">
                    Comments
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {isModalOpen && (
                    <>
                      <div
                        className="comments pb-4 px-md-4"
                        style={{ height: "100vh", overflowY: "scroll" }}
                      >
                        <CommentedImage />
                        <TextComment />
                        <TextComment />
                        <TextComment />
                        <TextComment />
                        <TextComment />
                        <TextComment />
                        <div style={{ paddingBottom: "20vh" }}></div>
                      </div>
                      <div
                        className="card-footer p-0 m-0"
                        style={{
                          position: "fixed",
                          bottom: "0",
                          width: isXSmall
                            ? "100%"
                            : isSmall
                            ? "74.8%"
                            : isMid
                            ? "59.8%"
                            : isLg
                            ? "49.9%"
                            : "49.9%",
                        }}
                      >
                        <Comment />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

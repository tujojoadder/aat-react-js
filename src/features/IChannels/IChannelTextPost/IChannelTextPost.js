import React, { useState, useEffect, useRef } from "react";

import TextComment from "../../home/Components/ReplyComment/ReplyComment";

import "./IChannelTextPost.css";
import CommentedText from "../../CommentedMedia/CommentedText/CommentedText";
import SendMessage from "../../Messages/SendMessages/SendMessage";
import { formatLargeNumber, formatPostDate } from "../../../utils/dateUtils";
import TextPostSkeleton from "../../home/Components/TextPost/TextPostSkeleton/TextPostSkeleton";
import { useToggleLoveMutation } from "../../../services/loveApi";
import { useToggleUnlikeMutation } from "../../../services/unlikeApi";
import { useDispatch, useSelector } from "react-redux";
import { setLoveReaction, setUnlikeReactions } from "../../home/HomeSlice";
import RootComment from "../../home/Components/Comment/RootComment/RootComment";

const IChannelTextPost = ({ post }) => {
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

  /* Image load handling  */
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isProfilePicLoaded, setIsProfilePicLoaded] = useState(false); // State to track profile picture load

  const [isXSmall, setIsXSmall] = useState(window.innerWidth <= 650);
  const [isSmall, setIsSmall] = useState(
    window.innerWidth > 650 && window.innerWidth <= 950
  );
  const [isMid, setIsMid] = useState(
    window.innerWidth > 950 && window.innerWidth <= 1200
  );
  const [isLg, setIsLg] = useState(window.innerWidth > 1200);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      modalElement.addEventListener("shown.bs.modal", handleModalShow);
      modalElement.addEventListener("hidden.bs.modal", handleModalHide);
      return () => {
        modalElement.removeEventListener("shown.bs.modal", handleModalShow);
        modalElement.removeEventListener("hidden.bs.modal", handleModalHide);
      };
    }
  }, []);

  const handleModalShow = () => {
    setIsModalOpen(true);
  };

  const handleModalHide = () => {
    setIsModalOpen(false);
  };

  /* Text */
  const [isExpanded, setIsExpanded] = useState(false);
  const fullText = post.text_post.post_text;
  const previewText = fullText.substring(0, 175);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  /* handle image loaded or not  */
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleProfilePicLoad = () => {
    setIsProfilePicLoaded(true);
  };

  return (
    <div className="posts mx-2 ">
      {!post ? (
        <TextPostSkeleton />
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
              src={`${post.iaccount.iaccount_picture}`}
              alt="user-profile"
              onLoad={handleProfilePicLoad}
              style={{ display: isProfilePicLoaded ? "block" : "none" }}
            />
          </div>

          <div className="user-contents-text-box">
            <div className="user-names-text pb-1" style={{ marginTop: "2px" }}>
              <div className="name-column ">
                <h1 className="full-name-text m-0 p-0">
                  {post.iaccount.iaccount_name}
                </h1>
                <p className="user-name-text m-0 p-0">
                  @{post.iaccount.identifier}
                </p>
              </div>
              <p
                className="time-text ms-3 "
                style={{ marginTop: "10px", maxWidth: "150px" }}
              >
                {formatPostDate(post.created_at)}
              </p>
            </div>

            <div className="user-contents pe-4">
              <p style={{ margin: "0px" }}>
                {isExpanded ? fullText : previewText}
                {fullText.length > 175 && (
                  <span
                    onClick={toggleText}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    {isExpanded ? " See less" : "... See more"}
                  </span>
                )}
              </p>
            </div>

            <div className="content-icons pe-3">
              {/*   Love and Unlike */}
             {/*   Love and Unlike */}
             <i
                className={`far fa-heart ${
                  loveReactions ? "fas red-heart" : ""
                }`}
                onClick={handleLoveClick}
              >
                {post.totalLove > 0 && (
                  <span className="ps-1">{ formatLargeNumber(post.totalLove)}</span>
                )}
              </i>
              <i
                className={`far fa-thumbs-down ${
                  unlikeReactions ? "fas black-unlike" : ""
                }`}
                onClick={handleUnlikeClick}
              >
                {post.totalUnlike > 0 && (
                  <span className="ps-1">{  formatLargeNumber(post.totalUnlike) }</span>
                )}
              </i>


              {/* Comments */}
              <i
                className="ps-md-3 far fa-comment blue"
                data-bs-toggle="modal"
                data-bs-target={`#imageModal-${post.post_id}`} // Dynamic ID for modal
              >
                  {post.total_comments > 0 && (
                  <span className="ps-1"> {formatLargeNumber(post.total_comments) } </span>
                )}
              </i>
              <i className="fa-solid fa-chevron-up ps-md-3 pe-4"></i>
            </div>
          </div>
          {/* Modal */}
          <div
            className="modal fade"
            id={`imageModal-${post.post_id}`}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            ref={modalRef}
            style={{ overflowY: "hidden" }}
          >
            <div className="modal-dialog">
              <div className="modal-content ">
                <div className="modal-header shadow-sm p-3 bg-body rounded border-bottom">
                  <h5 className="modal-title fs-5 " id="exampleModalLabel">
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
                        className="comments pb-4 "
                        style={{ height: "100vh", overflowY: "scroll" }}
                      >
                        <RootComment thePostId={post.post_id} />

                        <div style={{ paddingBottom: "20vh" }}></div>
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
};

export default IChannelTextPost;

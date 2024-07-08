
import React, { useEffect, useState } from "react";
import image from "./logo.jpg";
import CommentedImage from "../../../CommentedMedia/CommentedImage/CommentedImage";
import TextComment from "../TextComment/TextComment";
import Comment from "../Comment/Comment/Comment";
import CommentedBothPosts from "../../../CommentedMedia/CommentedBothposts/CommentedBothPosts";

export default function BPost() {
  const [commentsHeight, setCommentsHeight] = useState("80vh"); // Default height for medium devices

  // Function to update the height based on window width
  const updateHeight = () => {
    if (window.innerWidth < 576) {
      setCommentsHeight("72vh"); // Small devices (sm) like mobile phones
    } else {
      setCommentsHeight("81vh"); // Medium devices (md) like tablets and desktops
    }
  };

  // Effect to update height when component mounts and on window resize
  useEffect(() => {
    updateHeight(); // Initial height update

    // Event listener for window resize
    window.addEventListener("resize", updateHeight);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []); // Empty dependency array ensures effect runs only on mount and unmount

  return (
    <div class="posts ">
      <div class="user-pics">
        <img src={image} alt="user1" />
      </div>
      <div class="user-content-box ">
        <div className="user-names" style={{ marginTop: "2px" }}>
          <div className="name-column">
            <h1 className="full-name m-0 p-0">Turjo Joadder </h1>
            <p className="user-name m-0 p-0">@eric_alvareeric</p>
          </div>
          <p className="time me-4" style={{ marginTop: "18px" }}>
            {" "}
            2hrs
          </p>
        </div>

        <div class="user-content  " style={{ marginTop: "-5px" }}>
          <img
            style={{ Width: "100%", maxHeight: "65vh" }}
            src={image}
            alt="content1"
          />
        </div>
        <div className="content-icons  px-2 ">
          <i
            className=" far fa-heart red  "
            data-bs-toggle="modal"
            data-bs-target="#BPostModal"
          >
            {" "}
            109
          </i>

          <i className="fa-regular fa-thumbs-down ps-md-3"> 536</i>

          <i className="ps-md-3 far fa-comment blue "> 1.6k</i>
          <i class="fa-solid fa-chevron-up ps-md-3 pe-4"></i>
        </div>
      </div>

      {/* Modal */}
      <div
        style={{ overflowY: "hidden" }}
        className="modal fade "
        id="BPostModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content ">
            <div className="modal-header shadow-sm p-3 bg-body rounded">
              <h5 className="modal-title fs-5" id="exampleModalLabel">
                bb Comment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <div
                className="comments pb-4 px-md-4"
                style={{
                  height: commentsHeight,
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
              >
                <CommentedBothPosts />
                <TextComment />
                <TextComment />
                <TextComment />
                <TextComment />
                <TextComment />
                <TextComment />
              </div>
              <div className="my-comment">
                <Comment />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

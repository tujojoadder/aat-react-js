
import React, { useEffect, useRef, useState } from "react";
import image from "./logo.jpg";
import CommentedImage from "../../../CommentedMedia/CommentedImage/CommentedImage";
import TextComment from "../TextComment/TextComment";
import Comment from "../Comment/Comment/Comment";
import CommentedBothPosts from "../../../CommentedMedia/CommentedBothposts/CommentedBothPosts";

export default function BPost() {

 /* comment width */
 const [isSmall, setIsSmall] = useState(window.innerWidth <= 650);
 const [isMid, setIsMid] = useState(
   window.innerWidth > 650 && window.innerWidth <= 1200
 );
 const [isLg, setIsLg] = useState(
   window.innerWidth > 1200 && window.innerWidth <= 1450
 );
 const [isModalOpen, setIsModalOpen] = useState(false);

 const modalRef = useRef(null);

 const updateWidth = () => {
   setIsSmall(window.innerWidth <= 650);
   setIsMid(window.innerWidth > 650 && window.innerWidth <= 1200);
   setIsLg(window.innerWidth > 1200 && window.innerWidth <= 1450);
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
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet minima itaque, expedita possimus laborum, nam, cumque non in iste quo aliquam rerum cum inventore fugit et ratione dignissimos ducimus laudantium.</p>
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
        ref={modalRef}
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
            {isModalOpen && (
                <>
                  <div
                    className="comments px-md-4 "
                    style={{
                      height: "100vh",
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
                    {/* Needed */}
                    <div style={{ paddingBottom: "20vh" }}></div>
                  </div>
                  {/* Footer */}
                  <div
                    className="card-footer p-0 m-0"
                    style={{
                      position: "fixed",
                      bottom: "0px",
                      width: isSmall
                        ? "100%"
                        : isMid
                        ? "69.8%"
                        : isLg
                        ? "69.9%"
                        : "44.9%",
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
    </div>
  );
}

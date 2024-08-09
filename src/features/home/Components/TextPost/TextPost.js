import React, { useState, useEffect, useRef } from "react";
import image from "./logo.jpg";
import TextComment from "../TextComment/TextComment";
import Comment from "../Comment/Comment/Comment";
import "./TextPost.css";
import CommentedText from "../../../CommentedMedia/CommentedText/CommentedText";
import SendMessage from "../../../Messages/SendMessages/SendMessage";

const TextPost = () => {
  /* comment width */
  const [isXSmall, setIsXSmall] = useState( window.innerWidth <= 650);
  const [isSmall, setIsSmall] = useState( window.innerWidth > 650 && window.innerWidth <= 950);
  const [isMid, setIsMid] = useState(
    window.innerWidth > 950 && window.innerWidth <= 1200
  );
  const [isLg, setIsLg] = useState(
    window.innerWidth > 1200 
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);

  const updateWidth = () => {
    setIsXSmall( window.innerWidth <= 650);
    setIsSmall( window.innerWidth > 650 && window.innerWidth <= 950);
    setIsMid( window.innerWidth > 950 && window.innerWidth <= 1200);
    setIsLg( window.innerWidth > 1200 );
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
  const fullText = "আসওয়াদ (রহ.) হতে বর্ণিত। তিনি বলেনঃ ইবনু যুবায়র (রাযি.) আমাকে বললেন, ’আয়িশাহ (রাযি.) তোমাকে অনেক হাদীস গোপনে বলতেন। বল তো কা’বা সম্পর্কে তোমাকে কী বলেছেন? আমি বললাম, তিনি আমাকে বলেছেন, নবী সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেনঃ ’আয়িশাহ! তোমাদের কওম যদি (ইসলাম গ্রহণে) নতুন না হত, ইব্ন যুবায়র বলেনঃ কুফর থেকে; তবে আমি কা’বা ভেঙ্গে ফেলে তার দু’টি দরজা বানাতাম। এক দরজা দিয়ে লোক প্রবেশ করত আর এক দরজা দিয়ে বের হত। (পরবর্তীকালে মক্কার"; // Shortened for brevity
  const previewText = fullText.substring(0, 175);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="posts">
      <div className="user-pics">
        <img src={image} alt="user3" />
      </div>
      <div className="user-contents-text-box">
        <div className="user-names-text pb-1" style={{ marginTop: "2px" }}>
          <div className="name-column">
            <h1 className="full-name-text m-0 p-0">Mohammad </h1>
            <p className="user-name-text m-0 p-0">@eric_alvareeric</p>
          </div>
          <p className="time-text ms-3" style={{ marginTop: "10px" }}>
            2hrs
          </p>
        </div>




        <div className="user-contents">
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
          <i
            className="far fa-heart red"
            data-bs-toggle="modal"
            data-bs-target="#textModal"
          >
            {" "}
            109
          </i>
          <i className="fa-regular fa-thumbs-down ps-md-3 ms-1"> 536</i>
          <i className="far fa-comment blue ps-md-3 ms-1"> 1.6k</i>
          <i className="fa-solid fa-chevron-up ps-md-3 me-2"></i>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="textModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header shadow-sm p-3 bg-body rounded">
              <h5 className="modal-title fs-5" id="exampleModalLabel">
                Comment
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
                    className="comments px-md-4 "
                    style={{
                      height: "100vh",
                      overflowY: "scroll",
                      overflowX: "hidden",
                    }}
                  >
                    <CommentedText />
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
                      width:isXSmall?'100%': isSmall
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
    </div>
  );
};

export default TextPost;

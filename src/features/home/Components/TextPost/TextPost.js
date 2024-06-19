import React from "react";
import image from "./logo.jpg";
import BothPost from "../BothPost/BothPost";
import Comment from "../Comment/Comment";
import ImagePost from "../ImagePost/ImagePost";
import TextComment from "../TextComment/TextComment";
import ReplyComment from "../ReplyComment/ReplyComment";
import './TextPost.css';
const TextPost = () => {
  return (
    <div className="posts">
      <div className="user-pics">
        <img src={image} alt="user3" />
      </div>
      <div className="user-content-text-box">
        <div className="user-names" style={{ marginTop: '2px' }}>
          <div className="name-column">
            <h1 className="full-name m-0 p-0">Mohammad </h1>
            <p className="user-name m-0 p-0">@eric_alvareeric</p>
          </div>
          <p className="time ms-3" style={{ marginTop: '18px' }}>  2hrs</p>
        </div>

        <div className="user-content">
          <p>
            Nc
          </p>
        </div>

        <div className="content-icons">
          <i
            className="far fa-comment blue"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {" "}
            109
          </i>



        <i className="fa-regular fa-thumbs-down" > 536</i>
    
          <i className="far fa-heart red"> 1.6k</i>

          <i class="fa-solid fa-gear"></i>
       
        </div>
      </div>

      {/* Modal */}
      <div
        style={{ overflowY: "hidden" }}
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
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
              <div
                className="comments"
                style={{ height: "71vh", overflowY: "scroll" }}
              >
                <BothPost />
                <TextComment />
                <div className="replay ml-4">
                  <ReplyComment />
                  <ReplyComment />
                  <ReplyComment />
                </div>
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
};

export default TextPost;

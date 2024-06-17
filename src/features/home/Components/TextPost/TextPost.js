import React from 'react';
import image from "./logo.jpg";
import BothPost from '../BothPost/BothPost';

const TextPost = () => {
  return (
    <div className="posts">
      <div className="user-pics">
        <img src={image} alt="user3" />
      </div>
      <div className="user-content-box">
        <div className="user-names pt-2">
          <h1 className="full-name">Olivia Brent</h1>
          <p className="user-name">@iamolivia</p>
          <p className="time">. 58mins</p>
        </div>

        <div className="user-content">
          <p>
            We've gotta send kids back to school so one day they can be doctors and scientists, and everyone can ignore them.
          </p>
        </div>

        <div className="content-icons">
          <i className="far fa-comment blue" data-bs-toggle="modal" data-bs-target="#exampleModal"> 109</i>
          <i className="fas fa-retweet green"> 865</i>
          <i className="far fa-heart red">1.6k</i>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Replace with your modal content */}
   <BothPost/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextPost;

import React from 'react';
import image from "./logo.jpg";
import BothPost from '../BothPost/BothPost';
import Comment from '../Comment/Comment';
import ImagePost from '../ImagePost/ImagePost';

const TextPost = () => {
  return (
    <div className="posts">
      <div className="user-pics">
        <img src={image} alt="user3" />
      </div>
      <div className="user-content-box">
      <div className="user-names" style={{ marginTop: '2px' }}>
          <div className="name-column">
            <h1 className="full-name m-0 p-0">Mohammad </h1>
            <p className="user-name m-0 p-0">@eric_alvareeric</p>
          </div>
          <p className="time ms-3" style={{ marginTop: '18px' }}>  2hrs</p>
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
      <div style={{overflowY:'hidden'}} className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="comments" style={{ height:'71vh',overflowY:'scroll' }}>
<BothPost/>
<ImagePost/>
<ImagePost/>
<ImagePost/>
              </div>
              <div className="my-comment" >
              <Comment/>
              </div>

            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextPost;

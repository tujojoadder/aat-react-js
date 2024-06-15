import React from 'react'
import image from "./logo.jpg";
export default function CreatePost() {
  return (
    <div><div class="post">
            <form action="">
              <div class="form-group-1">
                <img src={image} alt="profile-pics" />
                <input type="text" placeholder="What's happening?" />
              </div>
              <div class="form-group-2">
                <div class="post-icons">
                  <i class="far fa-image"></i>
                  <i class="far fa-file-image"></i>
                 
                </div>
                <button class="btn" type="submit">
                  Tweet
                </button>
              </div>
            </form>
          </div></div>
  )
}

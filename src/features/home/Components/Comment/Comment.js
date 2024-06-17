import React from 'react'
import image from "./logo.jpg";
import '../../../../style.css';
import '../../../../all.css';
export default function Comment() {
  return (
    <div className="create-comment">
      <div className="post">
        <form action="">
          <div className="form-group-1">
            <img src={image} style={{width:'50px',width:'50px',borderRadius:'50%'}} alt="profile-pics" />
            <input style={{borderBottom:'1px blue solid'}} type="text" placeholder="Reply with text" />
          </div>

          <div className="d-flex bd-highlight mb-3">
            
            
            

            <div className="ms-auto  bd-highlight" >
          
              <button className="btn  btn-primary p-2 px-4 mx-3 my-1" type="submit" style={{borderRadius:'70px',fontWeight:'bold'}}>
                Reply
              </button>
            </div>
          </div>

          {/* Replace with select dropdown */}
        </form>
      </div>
    </div>
  )
}

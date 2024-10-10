import React from 'react'

export default function LargeScreenCommentBack({showComments}) {
  return (
    <div className="d-none pt-1 mb-1 d-md-flex align-items-center justify-content-between pb-1 ms-2 ">
    <button className="btn btn-link pt-2 p-0 m-0"  onClick={showComments} >
      <i className="fas fa-arrow-left fs-4"></i>
    </button>
    <h5 style={{fontWeight:'bolder'}} className="flex-grow-1 ps-3 pt-1  text-left mb-0">Replies</h5>
  </div>
  )
}

import React from 'react'

export default function MidScreenCommentback({showComments}) {
  return (
    <div  className="header-container d-none d-sm-block d-md-none">
    <span className="company-name">
      <i
        className="fa-solid fa-arrow-left pe-2"
        onClick={showComments}
      ></i>
      <span>Replies</span>
    </span>
  </div>
  )
}

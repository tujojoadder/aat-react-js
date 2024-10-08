import React from 'react'

export default function SmallScreenCommnetBack({showComments}) {
  return (
    <div className="header-container d-sm-none ">
    <span className="company-name"><i className="fa-solid fa-arrow-left pe-2" onClick={showComments}></i> <span className=''>Replies</span></span>

  </div>
  )
}

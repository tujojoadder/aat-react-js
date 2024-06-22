import React from 'react'
import SendFriendRequest from '../SendFriendRequest/SendFriendRequest'
import { Scrollbars } from 'react-custom-scrollbars';

export default function SuggestedFriend() {
  return (

   
    <div className=" ps-1">
    <div>
      <div className="row">
        <div className="col-6">
          <h3>Suggested</h3>
        </div>
        <div className="col-6">
          <h6 className="text-center  text-info">
            {" "}
            <b>See All</b>
          </h6>
        </div>
      </div>
    </div>
    <Scrollbars style={{ width: '100%', height:'32vh' }} autoHide >
<div className="mb-4">



    <SendFriendRequest />
    <SendFriendRequest />
    <SendFriendRequest />
    <SendFriendRequest />
    <SendFriendRequest />
    <SendFriendRequest />
    <SendFriendRequest />
    </div>
    </Scrollbars>
  </div>
  )
}

import React from 'react'
import SendFriendRequest from '../SendFriendRequest/SendFriendRequest'

export default function SuggestedFriend() {
  return (
    <div className=" p-2">
    <div>
      <div className="row">
        <div className="col-6">
          <h4>Suggested</h4>
        </div>
        <div className="col-6">
          <h6 className="text-center pt-2 text-info">
            {" "}
            <b>See All</b>
          </h6>
        </div>
      </div>
    </div>

    <SendFriendRequest />
    <SendFriendRequest />
    <SendFriendRequest />
    <SendFriendRequest />
  </div>
  )
}

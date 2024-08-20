import React, { useEffect, useState } from 'react';
import { useGetSpecificUserFollowerQuery } from '../../../services/profileApi'
import Spinner from '../../Spinner/Spinner'
import SendFriendRequest from '../../home/Components/SendFriendRequest/SendFriendRequest'
import { useInView } from 'react-intersection-observer';
import ShowUserFlower from './ShowUserFlower/ShowUserFlower';

export default function FollowerContainer({id}) {
const [followerPage, setFollowerPage] = useState(1);
const [allFollower, setallFollower] = useState([]);
const [hasMoreFollower, sethasMoreFollower] = useState(true);

// Get reference and visibility state
const { ref:followerRef, inView:fllowerInView } = useInView({
  threshold: 0,
  triggerOnce: false,
});



  //Reset post if id change
  useEffect(() => {
    setFollowerPage(1);
    setallFollower([]);
    sethasMoreFollower(true);
  }, [id]);

// Fetch data using dynamic query
const { data: useGetSpecificUserFollowerQueryData, isFetching: useGetSpecificUserFollowerQueryIsFetching, isError: useGetSpecificUserFollowerQueryIsError, isSuccess: useGetSpecificUserFollowerQueryIsSuccess }
 = useGetSpecificUserFollowerQuery({followerPage,id});


if (useGetSpecificUserFollowerQueryIsSuccess) {
    console.log(useGetSpecificUserFollowerQueryData)
}

// Effect to process fetched data
useEffect(() => {
  if (useGetSpecificUserFollowerQueryIsSuccess && useGetSpecificUserFollowerQueryData?.data) {
    if (useGetSpecificUserFollowerQueryData.data.length === 0) {
      sethasMoreFollower(false);
    } else {
      const newFollowers = useGetSpecificUserFollowerQueryData.data.filter(
        (newPost) => !allFollower.some((follower) => follower.follower_id === newPost.follower_id)
      );
      if (newFollowers.length > 0) {
      
        setallFollower((prevPosts) => [...prevPosts, ...newFollowers]);
      }
    }
  }
}, [useGetSpecificUserFollowerQueryData, useGetSpecificUserFollowerQueryIsSuccess]);

// Effect to handle infinite scroll logic
useEffect(() => {
  if (fllowerInView && !useGetSpecificUserFollowerQueryIsFetching && !useGetSpecificUserFollowerQueryIsError && hasMoreFollower && useGetSpecificUserFollowerQueryIsSuccess) {
    setFollowerPage((prevfollower) => prevfollower + 1);
  }
}, [fllowerInView, useGetSpecificUserFollowerQueryIsFetching, useGetSpecificUserFollowerQueryIsError, hasMoreFollower, useGetSpecificUserFollowerQueryIsSuccess]);

if (useGetSpecificUserFollowerQueryIsSuccess) {
    console.log(useGetSpecificUserFollowerQueryData)
}
  return (
    <div>
    <div className="container py-4" style={{ border: 'none' }}>
      <div className="row">
        {allFollower.map((follower, index) => (
          <div className="col-12 mb-2" key={index}>
    <ShowUserFlower 
                user_id={follower.follower.user_id}
                name={`${follower.follower.user_fname} ${follower.follower.user_lname}`} // Combine first and last name
                image={follower.follower.profile_picture}
                handle={follower.follower.identifier}

              />




          </div>
        ))}
      </div>
    
      {/* Spinner for loading more friends */}
      <div
        ref={followerRef}
        className="loading-trigger"
        style={{height:'7vh',minHeight:'40px'}}
      >
        {useGetSpecificUserFollowerQueryIsFetching && <Spinner />}
      </div>
    </div>
    </div>
  )
}


import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetAuthUserFriendQuery } from '../../../../services/profileApi';
import MyRelativeIds from '../MyRelativeIds/MyRelativeIds';
import Spinner from '../../../Spinner/Spinner';

export default function MyProfileFriendsContainer() {
  const [friendPage, setFriendPage] = useState(1);
  const [allFriends, setAllFriends] = useState([]);
  const [hasMoreFriends, setHasMoreFriends] = useState(true);

  // Get reference and visibility state
  const { ref: friendRef, inView: friendInView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });


  // Fetch data using dynamic query
  const { 
    data: useGetSpecificUserFriendQueryData, 
    isFetching: useGetSpecificUserFriendQueryIsFetching, 
    isError: useGetSpecificUserFriendQueryIsError, 
    isSuccess: useGetSpecificUserFriendQueryIsSuccess 
  } = useGetAuthUserFriendQuery({ friendPage});



  // Effect to process fetched data
  useEffect(() => {
    if (useGetSpecificUserFriendQueryIsSuccess && useGetSpecificUserFriendQueryData?.data) {
      if (useGetSpecificUserFriendQueryData.data.length === 0) {
        setHasMoreFriends(false);
      } else {
        const newFriends = useGetSpecificUserFriendQueryData.data.filter(
          (newFriend) => !allFriends.some((friend) => friend.user_id === newFriend.user_id)
        );
        if (newFriends.length > 0) {
          setAllFriends((prevFriends) => [...prevFriends, ...newFriends]);
        }
      }
    }
  }, [useGetSpecificUserFriendQueryData, useGetSpecificUserFriendQueryIsSuccess, allFriends]);

  // Effect to handle infinite scroll logic
  useEffect(() => {
    if (friendInView && !useGetSpecificUserFriendQueryIsFetching && !useGetSpecificUserFriendQueryIsError && hasMoreFriends) {
      setFriendPage((prevPage) => prevPage + 1);
    }
  }, [friendInView, useGetSpecificUserFriendQueryIsFetching, useGetSpecificUserFriendQueryIsError, hasMoreFriends]);

  return (
    <div>
      <div className="container py-4" style={{ border: 'none' }}>
        <div className="row">

        {allFriends.length === 0 && !useGetSpecificUserFriendQueryIsFetching && <h4 className="text-center" style={{color:'#592529'}}>No Friends to show</h4>}

          {allFriends.map((friend, index) => (
            <div className="col-12 mb-2" key={index}>
              <MyRelativeIds 
                user_id={friend.user_id}
                name={`${friend.user_fname} ${friend.user_lname}`} // Combine first and last name
                image={friend.profile_picture}
                handle={friend.identifier}
                
              />
            </div>
          ))}
        </div>

        {/* Spinner for loading more friends */}
        <div
          ref={friendRef}
          className="loading-trigger"
             style={{height:'7vh',minHeight:'40px'}}
        >
          {useGetSpecificUserFriendQueryIsFetching && <Spinner />}
        </div>
      </div>
    </div>
  );
}

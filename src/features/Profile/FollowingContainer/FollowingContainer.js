import React, { useEffect, useState } from 'react';
import { useGetSpecificUserFollowingQuery } from '../../../services/profileApi';
import Spinner from '../../Spinner/Spinner';
import { useInView } from 'react-intersection-observer';
import ShowUserFlowing from './ShowUserFlowing/ShowUserFlowing';

export default function FollowingContainer({ id }) {
    const [followingPage, setFollowingPage] = useState(1);
    const [allFollowing, setAllFollowing] = useState([]);
    const [hasMoreFollowing, setHasMoreFollowing] = useState(true);

    // Get reference and visibility state
    const { ref: followingRef, inView: followingInView } = useInView({
        threshold: 0,
        triggerOnce: false,
    });
  //Reset post if id change
  useEffect(() => {
    setFollowingPage(1);
    setAllFollowing([]);
    setHasMoreFollowing(true);
  }, [id]);
    // Fetch data using dynamic query
    const { 
        data: useGetSpecificUserFollowingQueryData, 
        isFetching: useGetSpecificUserFollowingQueryIsFetching,
        isError: useGetSpecificUserFollowingQueryIsError, 
        isSuccess: useGetSpecificUserFollowingQueryIsSuccess 
    } = useGetSpecificUserFollowingQuery({ followingPage, id });

if (useGetSpecificUserFollowingQueryIsSuccess) {
    console.log(useGetSpecificUserFollowingQueryData)
}


    // Effect to process fetched data
    useEffect(() => {
        if (useGetSpecificUserFollowingQueryIsSuccess && useGetSpecificUserFollowingQueryData?.data) {
            if (useGetSpecificUserFollowingQueryData.data.length === 0) {
                setHasMoreFollowing(false);  // Instead of setting allFollowing to false, handle it with a flag
            } else {
                const newFollowing = useGetSpecificUserFollowingQueryData.data.filter(
                    (newFollowingItem) => 
                        !allFollowing.some((following) => following.following_id === newFollowingItem.following_id)
                );
                
                if (newFollowing.length > 0) {
                    setAllFollowing((prevFollowings) => [...prevFollowings, ...newFollowing]);
                }
            }
        }
    }, [useGetSpecificUserFollowingQueryData, useGetSpecificUserFollowingQueryIsSuccess, allFollowing]);

    // Effect to handle infinite scroll logic
    useEffect(() => {
        if (
            followingInView && 
            !useGetSpecificUserFollowingQueryIsFetching && 
            !useGetSpecificUserFollowingQueryIsError && 
            hasMoreFollowing && 
            useGetSpecificUserFollowingQueryIsSuccess
        ) {
            setFollowingPage((prevPage) => prevPage + 1);
        }
    }, [followingInView, useGetSpecificUserFollowingQueryIsFetching, useGetSpecificUserFollowingQueryIsError, hasMoreFollowing, useGetSpecificUserFollowingQueryIsSuccess]);

    return (
        <div>
            <div className="container py-4" style={{ border: 'none' }}>
                <div className="row">
                    {Array.isArray(allFollowing) && allFollowing.length > 0 ? (
                        allFollowing.map((following, index) => (
                            <div className="col-12 mb-2" key={index}>
                              
                                {/* Replace with your component to show following details */}
                                <ShowUserFlowing 
                                    user_id={following.following.user_id}
                                    name={`${following.following.user_fname} ${following.following.user_lname}`} // Combine first and last name
                                    image={following.following.profile_picture}
                                    handle={following.following.identifier}
                                />



                            </div>
                        ))
                    ) : (
                        <p>No followers found.</p>
                    )}
                </div>
            
                {/* Spinner for loading more followers */}
                <div
                    ref={followingRef}
                    className="loading-trigger"
                    style={{ height: '7vh', minHeight: '40px' }}
                >
                    {useGetSpecificUserFollowingQueryIsFetching && <Spinner />}
                </div>
            </div>
        </div>
    );
}

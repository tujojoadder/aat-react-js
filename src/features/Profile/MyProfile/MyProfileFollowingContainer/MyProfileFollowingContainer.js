
import React, { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';

import Spinner from '../../../Spinner/Spinner';
import { useGetAuthUserFollowingQuery } from '../../../../services/profileApi';
import MyRelativeIds from '../MyRelativeIds/MyRelativeIds';

export default function MyProfileFollowingContainer() {
    const [followingPage, setFollowingPage] = useState(1);
    const [allFollowing, setAllFollowing] = useState([]);
    const [hasMoreFollowing, setHasMoreFollowing] = useState(true);

    // Get reference and visibility state
    const { ref: followingRef, inView: followingInView } = useInView({
        threshold: 0,
        triggerOnce: false,
    });


    // Fetch data using dynamic query
    const { 
        data: useGetSpecificUserFollowingQueryData, 
        isFetching: useGetSpecificUserFollowingQueryIsFetching,
        isError: useGetSpecificUserFollowingQueryIsError, 
        isSuccess: useGetSpecificUserFollowingQueryIsSuccess 
    } = useGetAuthUserFollowingQuery({ followingPage });

    // Process fetched data
    useEffect(() => {
        if (useGetSpecificUserFollowingQueryIsSuccess && useGetSpecificUserFollowingQueryData?.data) {
            if (useGetSpecificUserFollowingQueryData.data.length === 0) {
                setHasMoreFollowing(false);
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

    // Handle infinite scroll logic
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
                                <MyRelativeIds
                                    user_id={following.following.user_id}
                                    name={`${following.following.user_fname} ${following.following.user_lname}`} // Combine first and last name
                                    image={following.following.profile_picture}
                                    handle={following.following.identifier}
                                />
                            </div>
                        ))
                    ) : (
                        !useGetSpecificUserFollowingQueryIsFetching && (
                            <h4 className="text-center" style={{ color: '#592529' }}>
                                No Following to show
                            </h4>
                        )
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

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';

// Retrieve the token from cookies
const userToken = Cookies.get('userToken');

// Define a service using a base URL and expected endpoints

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api",
      prepareHeaders: (headers) => {
        if (userToken) {
            headers.set('authorization', `Bearer ${userToken}`);
        }
        return headers;
    },
     }),
    endpoints: (builder) => ({


   /*    get specific usrer post for profile */
        getSpecificUserPost: builder.query({
            query: ({ page = 1, id }) => `getspecificuserposts?page=${page}&id=${id}`, // Updated to include id
          }),

   /*    get specific usrer images for profile */
          getSpecificUserPhoto: builder.query({
            query: ({ photoPage = 1, id }) => `getspecificuserphotos?page=${photoPage}&id=${id}`, // Updated to include id
          }),


   /* get specific usrer images for profile */
       getSpecificUserFriend: builder.query({
       query: ({ friendPage = 1, id }) => `getspecificuserfriendids?page=${friendPage}&id=${id}`, // Updated to include id
       }),



   /* get all followers for specific user on profile*/
   getSpecificUserFollower: builder.query({
    query: ({ followerPage = 1, id }) => `getspecificuserfollower?page=${followerPage}&id=${id}`, // Updated to include id
    }),

      
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetSpecificUserFollowerQuery,useGetSpecificUserPhotoQuery, useGetSpecificUserPostQuery,useGetSpecificUserFriendQuery } = profileApi
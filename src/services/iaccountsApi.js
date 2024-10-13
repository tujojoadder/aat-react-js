// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Retrieve the token from cookies
const userToken = Cookies.get("userToken");

// Define a service using a base URL and expected endpoints

export const iaccountsApi = createApi({
  reducerPath: "iaccountsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers) => {
      if (userToken) {
        headers.set("authorization", `Bearer ${userToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Create","JoinOrLeave","CreatePost"],
  endpoints: (builder) => ({
    createIAccount: builder.mutation({
      query: (iAccountData) => ({
        url: "iaccount/create", // This should be the correct endpoint for your Laravel API
        method: "POST",
        body: iAccountData,
      }),
      invalidatesTags:['Create']
    }),
/* Create iAccount Post */   
userIAccountPostInsert: builder.mutation({
  query: (data) => {
    return {
      url: "/iaccount/post/create",
      method: "POST",
      body: data,
    };
  },
  invalidatesTags:['CreatePost']
}),

    /*  get random post */
    getRandomIaccountPost: builder.query({
      query: (page = 1) => `iaccount/randomposts?page=${page}`, // Updated to include id
    }),

    // get pages where auth user is admin
    getYourIaccounts: builder.query({
      query: (page = 1) => `get-your-iaccounts?page=${page}`, // Adjust the endpoint URL as needed
      providesTags:['Create']
    }),

    // get following iaccounts
    getLikedIaccounts: builder.query({
      query: (page = 1) => `get-iaccounts-liked?page=${page}`, // Adjust the endpoint URL as needed
      providesTags:['JoinOrLeave']
    }),

    //get specific group details
    getIaccountDetails: builder.query({
      query: (id) => `/iaccountdetails/${id}`, // Make sure this endpoint exists in your backend
    }),

    /*    get specific ichannel posts */
    getSpecificIaccountPost: builder.query({
      query: ({ page = 1, iChannelId }) =>
        `getspecificiaccountposts?page=${page}&id=${iChannelId}`, // Updated to include id
      providesTags:['CreatePost']
    }),

    /*    get specific usrer images for ichannel */
    getSpecificIChannelPhoto: builder.query({
      query: ({ photoPage = 1, iChannelId }) =>
        `getspecificichannelphotos?page=${photoPage}&id=${iChannelId}`, // Updated to include id
      providesTags:['CreatePost']
    }),

    /* get specific iaccount frien for profile */
    getSpecificIaccountFollowerFriend: builder.query({
      query: ({ followerPage = 1, iChannelId }) =>
        `getspecificiaccountfollowerids?page=${followerPage}&id=${iChannelId}`, // Updated to include id
    }),
    joinIChannel: builder.mutation({
      query: (iChannelId) => ({
        url: `iaccount/join/${iChannelId}`,
        method: "POST",
      }),
      invalidatesTags:['JoinOrLeave']
    }),

    leaveIChannel: builder.mutation({
      query: (iChannelId) => ({
        url: `iaccount/leave/${iChannelId}`,
        method: "POST",
      }),
      invalidatesTags:['JoinOrLeave']
    }),

    /* updateGroupName */
    updatIAccountName: builder.mutation({
      query: ({ iChannelId, name }) => ({
        url: `iaccount/${iChannelId}/update/name`,
        method: "PUT",
        body: { name },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateIAccountMutation,
  useUpdatIAccountNameMutation,
  useUserIAccountPostInsertMutation,
  useJoinIChannelMutation,
  useLeaveIChannelMutation,
  useGetSpecificIaccountFollowerFriendQuery,
  useGetSpecificIChannelPhotoQuery,
  useGetSpecificIaccountPostQuery,
  useGetIaccountDetailsQuery,
  useGetLikedIaccountsQuery,
  useGetYourIaccountsQuery,
  useGetRandomIaccountPostQuery,
} = iaccountsApi;

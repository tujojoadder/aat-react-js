// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Retrieve the token from cookies
const userToken = Cookies.get("userToken");

// Define a service using a base URL and expected endpoints

export const friendsApi = createApi({
  reducerPath: "friendsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers) => {
      if (userToken) {
        headers.set("authorization", `Bearer ${userToken}`);
      }
      return headers;
    },
  }),
  tagTypes:["RequestOrCancel","AcceptFriendRequest"],
  endpoints: (builder) => ({
    //get friend sugestion 5 record for home
    friendSuggestionhome: builder.query({
      query: () => {
        return {
          url: "/friendsuggestionhome",
          method: "GET",
        };
      },
    }),

    //get specific user details

    getUserDetails: builder.query({
      query: (id) => `/userdetails/${id}`, // Make sure this endpoint exists in your backend
    }),

    /* Send Friend Request */
    sendFriendRequest: builder.mutation({
      query: (receiver_id) => {
        return {
          url: "/sendfriendrequest",
          method: "POST",
          body: receiver_id,
        };
      },
      invalidatesTags:['RequestOrCancel']
    }),

    /* cancel Friend Request */
    cancelFriendRequest: builder.mutation({
      query: (receiver_id) => {
        return {
          url: "/cancelfriendrequest",
          method: "POST",
          body: receiver_id,
        };
      },
      invalidatesTags:['RequestOrCancel']
    }),

    /* get specific usrer friend list */
    getAuthUserfriendRequest: builder.query({
      query: ({ friendRequestPage = 1 }) =>
        `auth-friend-requests?page=${friendRequestPage}`,
    }),

    /* get all sented request auuth user did pendding*/
    getAuthUserSentRequest: builder.query({
      query: ({ friendRequestPage = 1 }) =>
        `sentfriendrequest?page=${friendRequestPage}`,
      providesTags:['RequestOrCancel']
      
    }),

    /* <<<<---- Friend Request Page ----->>>> */

    /* friend request --->>>home  */

    getFriendSuggestion: builder.query({
      query: ({ friendSuggestionPage = 1 }) =>
        `getsuggestionfriends?page=${friendSuggestionPage}`,
      providesTags:['RequestOrCancel']
    }),

    /* Send Friend Request */
    manageFriendRequest: builder.mutation({
      query: ({ sender_id, decision }) => {
        return {
          url: "/managefriendrequest",
          method: "POST",
          body: { sender_id, decision },
        };
      },
      invalidatesTags:['AcceptFriendRequest']
    }),
 /*sss--> getAuthUserFriends */ 
 getAuthUserFriends: builder.query({
  query: ({ friendPage = 1 }) => `getauthuserfriendids?page=${friendPage}`, // Updated to include id
  providesTags:['AcceptFriendRequest']
}),

  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useManageFriendRequestMutation,
  useGetAuthUserFriendsQuery,
  useGetAuthUserSentRequestQuery,
  useGetFriendSuggestionQuery,
  useGetAuthUserfriendRequestQuery,
  useCancelFriendRequestMutation,
  useSendFriendRequestMutation,
  useGetUserDetailsQuery,
  
  useFriendSuggestionhomeQuery,
  useUserPostInsertMutation,
  useGetPostsQuery,
} = friendsApi;

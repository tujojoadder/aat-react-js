// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';

// Retrieve the token from cookies
const userToken = Cookies.get('userToken');

// Define a service using a base URL and expected endpoints

export const friendsApi = createApi({
    reducerPath: "friendsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api",
      prepareHeaders: (headers) => {
        if (userToken) {
            headers.set('authorization', `Bearer ${userToken}`);
        }
        return headers;
    },
     }),
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

      //get friend sugestion 7 record for home

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
      }),
    


      
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCancelFriendRequestMutation,useSendFriendRequestMutation,useGetUserDetailsQuery,useFriendSuggestionhomeQuery,useUserPostInsertMutation,useGetPostsQuery } = friendsApi
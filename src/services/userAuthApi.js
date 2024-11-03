// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';

// Retrieve the token from cookies
const userToken = Cookies.get('userToken');

// Define a service using a base URL and expected endpoints

export const userAuthApi = createApi({
    reducerPath: "userAuthApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.0.108:8000/api",
      prepareHeaders: (headers) => {
        if (userToken) {
            headers.set('authorization', `Bearer ${userToken}`);
        }
        return headers;
    },
     }),
  
    
    endpoints: (builder) => ({


   /*    get user details */
      getUserDetails: builder.query({
        query: () => {
          return {
            url: "/userdetails",
            method: "GET",
           
          };
        },
      }),
      logOutUser: builder.mutation({
        query: () => ({
          url: "/logout",
          method: "POST",
        
        }),
      }),

      
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDetailsQuery,useLogOutUserMutation } = userAuthApi
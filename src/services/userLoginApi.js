// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const userToken=localStorage.getItem('userToken');
// Define a service using a base URL and expected endpoints

export const userLoginApi = createApi({
    reducerPath: "userLoginApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }),
    endpoints: (builder) => ({



      userLogin: builder.mutation({
        query: (user) => {
          return {
            url: "googlelogin",
            method: "POST",
            body: user,
           
          };
        },
      }),
  

   
//go with credition 
googleHandle: builder.mutation({
        query: (user) => {
          return {
            url: "googlehandle",
            method: "POST",
            body: user,
          };
        },
      }),

 

      
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGoogleHandleMutation,useUserLoginMutation} = userLoginApi
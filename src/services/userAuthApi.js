// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const userToken=localStorage.getItem('userToken');
// Define a service using a base URL and expected endpoints

export const userAuthApi = createApi({
    reducerPath: "userAuthApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }),
    endpoints: (builder) => ({



      registerUser: builder.mutation({
        query: (user) => {
          return {
            url: "register",
            method: "POST",
            body: user,
            headers: {
        
                'Authorization': `Bearer ${userToken}`, 
            },
          };
        },
      }),
  
  
      getLoggedUser: builder.query({
        query: (token) => {
          return {
            url: "/profile",
            method: "GET",
            headers: {
              "authorization": `Bearer ${userToken}`,
            },
          };
        },
      }),
      
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLoggedUserQuery,useRegisterUserMutation } = userAuthApi
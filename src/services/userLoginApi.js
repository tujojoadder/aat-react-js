// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';
// Define a service using a base URL and expected endpoints
// Retrieve the token from cookies
const userToken = Cookies.get('userToken');

export const userLoginApi = createApi({
    reducerPath: "userLoginApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }),
    prepareHeaders: (headers) => {
      if (userToken) {
        headers.set('authorization', `Bearer ${userToken}`)
      }
      return headers
    },
    
    
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




 //go with credition 
additionalInformation: builder.mutation({
  query: (user) => {
    return {
      url: "additionalinformation",
      method: "POST",
      body: user,
    };
  },
}),

 
//normal login
login: builder.mutation({
  query: (user) => {
    return {
      url: "login",
      method: "POST",
      body: user,
    };
  },
}),


//send email to forgot password

forgotPassword: builder.mutation({
  query: (user) => {
    return {
      url: "forgotpassword",
      method: "POST",
      body: user,
    };
  },
}),


// reaset password
resetPassword: builder.mutation({
  query: (user) => {
    return {
      url: "resetpassword",
      method: "POST",
      body: user,
    };
  },
}),

// confirm password
confirmPassword: builder.mutation({
  query: (user) => {
    return {
      url: "confirmpassword",
      method: "POST",
      body: user,
    };
  },
}),

      
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useConfirmPasswordMutation,useResetPasswordMutation,useForgotPasswordMutation,useLoginMutation,useAdditionalInformationMutation,useGoogleHandleMutation,useUserLoginMutation} = userLoginApi
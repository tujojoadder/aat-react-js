
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';

// Retrieve the token from cookies
const userToken = Cookies.get('userToken');

// Define a service using a base URL and expected endpoints

export const pagesApi = createApi({
    reducerPath: "pagesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api",
      prepareHeaders: (headers) => {
        if (userToken) {
            headers.set('authorization', `Bearer ${userToken}`);
        }
        return headers;
    },
     }),
  
    
    endpoints: (builder) => ({
        createPage: builder.mutation({
            query: (pageData) => ({
              url: 'create-page', // The endpoint URL in your backend
              method: 'POST',
              body: pageData,
            }),
          }),
      
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreatePageMutation } = pagesApi
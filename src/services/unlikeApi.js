// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';

// Retrieve the token from cookies
const userToken = Cookies.get('userToken');

// Define a service using a base URL and expected endpoints

export const unlikeApi = createApi({
    reducerPath: "unlikeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.0.108:8000/api",
        prepareHeaders: (headers) => {
            if (userToken) {
              headers.set('authorization', `Bearer ${userToken}`)
            }
            return headers
          }
     }),
    endpoints: (builder) => ({



 // Define the toggleLove mutation
 toggleUnlike: builder.mutation({
    query: ({ unlikeOnType, unlikeOnId }) => ({
      url: `/toggle-unlike/${unlikeOnType}/${unlikeOnId}`,
      method: 'POST',
    }),
    }),
  



      
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useToggleUnlikeMutation

} = unlikeApi
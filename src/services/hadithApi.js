// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';

// Retrieve the token from cookies
const userToken = Cookies.get('userToken');

// Define a service using a base URL and expected endpoints

export const hadithApi = createApi({
    reducerPath: "hadithApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api",
        prepareHeaders: (headers) => {
            if (userToken) {
              headers.set('authorization', `Bearer ${userToken}`)
            }
            return headers
          }
     }),
    endpoints: (builder) => ({


   /*    get random hadith for hadithbox */
      getRandomHadith: builder.query({
        query: () => {
          return {
            url: "/get-random-hadith",
            method: "GET",
            
          };
        },
      }),
      


      // setDayhadith
      setDayhadith: builder.mutation({
    query: (data) => {
      return {
        url: "/setdayhadith",
        method: "POST",
        body: data,
      };
    },
  }),


  /*  Get all user day hadiths  */
  getDayHadiths: builder.query({
    query: () => {
      return {
        url: "/getdayhadiths",
        method: "GET",
        
      };
    },
  }),/* like day hadith */
  likeDayHadith: builder.mutation({
          query: (data) => {
            return {
              url: "/likedayhadith",
              method: "POST",
              body: data,
            };
          },
        }),

/* Day hadith Details  */
dayHadithDetails: builder.mutation({
        query: () => {
          return {
            url: "/dayhadithdetails",
            method: "POST",
           
          };
        },
      }),




      



      
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useDayHadithDetailsMutation,useGetRandomHadithQuery,useSetDayhadithMutation,useGetDayHadithsQuery,useLikeDayHadithMutation} = hadithApi
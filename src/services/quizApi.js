// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';

// Retrieve the token from cookies
const userToken = Cookies.get('userToken');

// Define a service using a base URL and expected endpoints

export const quizApi = createApi({
    reducerPath: "quizApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api",
        prepareHeaders: (headers) => {
            if (userToken) {
              headers.set('authorization', `Bearer ${userToken}`)
            }
            return headers
          }
     }),
    endpoints: (builder) => ({

        getRandomHadith: builder.mutation({
            query: () => ({
              url: '/random-hadith',
              method: 'POST',
            }),
          }),

          getRandomQuestion: builder.mutation({
            query: (hadithId) => ({
                url: 'get-random-question/' + hadithId, // You can also send it in the body if required
                method: 'POST',
                body: { hadithId }, // Optionally send more data here
            }),
        }),
        checkAnswer: builder.mutation({
            query: (answerData) => ({
              url: 'check-answer',
              method: 'POST',
              body: answerData,
            }),
          }),



    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetRandomHadithMutation,
    useCheckAnswerMutation,
    useGetRandomQuestionMutation } = quizApi
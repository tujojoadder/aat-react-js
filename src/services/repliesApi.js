// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';

// Retrieve the token from cookies
const userToken = Cookies.get('userToken');

// Define a service using a base URL and expected endpoints

export const repliesApi = createApi({
    reducerPath: "repliesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api",
        prepareHeaders: (headers) => {
            if (userToken) {
              headers.set('authorization', `Bearer ${userToken}`)
            }
            return headers
          }
     }),
    endpoints: (builder) => ({

        createCommentReply: builder.mutation({
            query: ({ commentId, reply_text }) => ({
              url: `/comments/${commentId}/replies`,
              method: 'POST',
              body: { reply_text },
            }),
          }),


          createReplyReplies: builder.mutation({
            query: ({ commentId, reply_text,parent_reply_id }) => ({
              url: `/reply/${commentId}/replies`,
              method: 'POST',
              body: { reply_text,parent_reply_id},
            }),
          }),



          getRepliesByCommentId: builder.query({
            query: ({commentId,page = 1}) => `comments/${commentId}/replies?page=${page}`, // Fetch comments for a specific post
          }),


      
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useCreateCommentReplyMutation,
    useGetRepliesByCommentIdQuery,
    useCreateReplyRepliesMutation


} = repliesApi
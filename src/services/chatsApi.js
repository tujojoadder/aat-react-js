// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';

// Retrieve the token from cookies
const userToken = Cookies.get('userToken');

// Define a service using a base URL and expected endpoints

export const chatsApi = createApi({
    reducerPath: "chatsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api",
        prepareHeaders: (headers) => {
            if (userToken) {
              headers.set('authorization', `Bearer ${userToken}`)
            }
            return headers
          }
     }),
    endpoints: (builder) => ({


        sendMessage: builder.mutation({
            query: (messageData) => ({
              url: '/chatmessage', // Laravel backend route
              method: 'POST',
              body: messageData,
            }),
          }),

          

    /*    load messages */
    loadChat: builder.query({
      query: ({ page = 1, receiver_id }) =>
        `loadchat?page=${page}&receiver_id=${receiver_id}`, // Updated to include id
    }),

 /*    delete messages */
    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `/message/delete`, // Assuming the delete endpoint is /message/delete
        method: 'DELETE',
        body: { message_id: messageId },
      }),
    }),



      
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSendMessageMutation,
  useLoadChatQuery,
  useDeleteMessageMutation
} = chatsApi
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const userToken=localStorage.getItem('userToken');
// Define a service using a base URL and expected endpoints
export const userChatApi = createApi({
    reducerPath: "userChatApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }),
    endpoints: (builder) => ({



      userMessage: builder.mutation({
        query: (user) => {
          return {
            url: "chatmessage",
            method: "POST",
            body: user,
            headers: {
        
                'Authorization': `Bearer ${userToken}`, 
            },
          };
        },
      }),
  

      loadChat: builder.mutation({
        query: (user) => {
          return {
            url: "loadchat",
            method: "POST",
            body: user,
            headers: {
        
                'Authorization': `Bearer ${userToken}`, 
            },
          };
        },
      }),


      deleteChat: builder.mutation({
        query: (user) => {
          return {
            url: "delete-chat",
            method: "POST",
            body: user,
            headers: {
        
                'Authorization': `Bearer ${userToken}`, 
            },
          };
        },
      }),




//Groups

      createGroup: builder.mutation({
        query: (user) => {
          return {
            url: "creategroup",
            method: "POST",
            body: user,
            headers: {
        
                'Authorization': `Bearer ${userToken}`, 
            },
          };
        },
      }),
      


  



      getGroupMember: builder.mutation({
        query: (user) => {
          return {
            url: "getmember",
            method: "POST",
            body: user,
            headers: {
        
                'Authorization': `Bearer ${userToken}`, 
            },
          };
        },
      }),
      


      addMember: builder.mutation({
        query: (user) => {
          return {
            url: "addmember",
            method: "POST",
            body: user,
            headers: {
        
                'Authorization': `Bearer ${userToken}`, 
            },
          };
        },
      }),
      

      getShareGroup: builder.mutation({
        query: (user) => {
          return {
            url: "sharegroup",
            method: "POST",
            body: user,
            headers: {
        
                'Authorization': `Bearer ${userToken}`, 
            },
          };
        },
      }),



      joinGroup: builder.mutation({
        query: (user) => {
          return {
            url: "joingroup",
            method: "POST",
            body: user,
            headers: {
        
                'Authorization': `Bearer ${userToken}`, 
            },
          };
        },
      }),

// only created group

getChatGroups: builder.query({
  query: (token) => {
    return {
      url: "mychatgroups",
      method: "GET",
      headers: {
        "authorization": `Bearer ${userToken}`,
      },
    };
  },
}),



//get all group you created or joined 
getAllGroups: builder.query({
  query: (token) => {
    return {
      url: "myallgroups",
      method: "GET",
      headers: {
        "authorization": `Bearer ${userToken}`,
      },
    };
  },
}),



//send group message

sendGroupMessage: builder.mutation({
  query: (user) => {
    return {
      url: "sendgroupmessage",
      method: "POST",
      body: user,
      headers: {
  
          'Authorization': `Bearer ${userToken}`, 
      },
    };
  },
}),




//load group chat
loadGroupChat: builder.mutation({
  query: (user) => {
    return {
      url: "loadgroupchat",
      method: "POST",
      body: user,
      headers: {
  
          'Authorization': `Bearer ${userToken}`, 
      },
    };
  },
}),


      
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoadGroupChatMutation,useSendGroupMessageMutation,useGetAllGroupsQuery,useJoinGroupMutation,useGetShareGroupMutation,useAddMemberMutation,useUserMessageMutation,useLoadChatMutation,useDeleteChatMutation,useCreateGroupMutation,useGetChatGroupsQuery,useGetGroupMemberMutation} = userChatApi
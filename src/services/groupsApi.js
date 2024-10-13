// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Retrieve the token from cookies
const userToken = Cookies.get("userToken");

// Define a service using a base URL and expected endpoints

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers) => {
      if (userToken) {
        headers.set("authorization", `Bearer ${userToken}`);
      }
      return headers;
    },
  }),
  
  tagTypes: ["Create", "Join","CreatePost","AcceptJoinRequest","ApprovePostOrReject"],
  endpoints: (builder) => ({
    //Create groups
    createGroup: builder.mutation({
      query: (groupData) => ({
        url: "/group/create",
        method: "POST",
        body: groupData,
      }),
      invalidatesTags: ["Create"],
    }),

    // Define your API slice
    getJoinedGroupsButNotAdmin: builder.query({
      // Accept a parameter for the page number
      query: (page = 1) => `/groups/joined-not-admin?page=${page}`,
      providesTags: ['Join'],
    }),
    // Define your API slice
    getJoinedGroupsButNotAdminRight: builder.query({
      // Accept a parameter for the page number
      query: (page = 1) => `/groups/joined-not-admin-right?page=${page}`,
    }),
      /*    get specific group posts */
      getSpecificGroupPost: builder.query({
        query: ({ page = 1, groupId }) =>
          `getspecificgroupposts?page=${page}&id=${groupId}`, // Updated to include id
        providesTags:['CreatePost','ApprovePostOrReject'],
        
      }),
  
    /* Create Group Post */   
userGroupPostInsert: builder.mutation({
  query: (data) => {
    return {
      url: "/group/post/create",
      method: "POST",
      body: data,
    };
  },
  invalidatesTags:['CreatePost']
}),


    // Define your API slice
    getGroupsWhereAdmin: builder.query({
      // Remove the page parameter since pagination is no longer needed
      query: (page = 1) => `/groups/joined-admin?page=${page}`,
      providesTags: ["Create"],
    }),

    // Define your API slice
    getGroupSuggestion: builder.query({
      // Accept a parameter for the page number
      query: (page = 1) => `/groups/suggestions?page=${page}`,
      providesTags:["Join"],
    }),

    //get specific group details
    getGroupDetails: builder.query({
      query: (id) => `/groupdetails/${id}`, // Make sure this endpoint exists in your backend
    }),

    /* get specific group frien for profile */
    getSpecificGroupPeople: builder.query({
      query: ({ friendPage = 1, groupId }) =>
        `getspecificuserfriendids?page=${friendPage}&id=${groupId}`, // Updated to include id
    }),

    

  
    /*    get specific usrer images for profile */
    getSpecificGroupPhoto: builder.query({
      query: ({ photoPage = 1, groupId }) =>
        `getspecificgroupphotos?page=${photoPage}&id=${groupId}`, // Updated to include id
      providesTags:['CreatePost']
    }),

    /* get member of group*/
    getAllGroupMember: builder.query({
      query: ({ memberPage = 1, groupId }) =>
        `getspecificgroupmember?page=${memberPage}&id=${groupId}`, // Updated to include id
      providesTags:['AcceptJoinRequest']
    }),
    /* get member of group for manage*/
    getAllGroupMemberManage: builder.query({
      query: ({ memberPage = 1, groupId }) =>
        `getspecificgroupmembermanage?page=${memberPage}&id=${groupId}`, // Updated to include id
      providesTags:['AcceptJoinRequest']
    }),
    /*  get random post */
    getRandomGroupPost: builder.query({
      query: (page = 1) => `group/randomposts?page=${page}`, // Updated to include id
    }),

    /* updateGroupName */
    updateGroupName: builder.mutation({
      query: ({ groupId, name }) => ({
        url: `groups/${groupId}/update/name`,
        method: "PUT",
        body: { name },
      }),
    }),

    /* updateGroupDetails */
    updateGroupDetails: builder.mutation({
      query: ({ groupId, details }) => ({
        url: `groups/${groupId}/update/details`,
        method: "PUT",
        body: { details },
      }),
    }),

    addGroupAdmin: builder.mutation({
      query: ({ groupId, newMember }) => ({
        url: `/groups/${groupId}/add-admin/${newMember}`,
        method: "POST",
      }),
    }),

    kickOutMember: builder.mutation({
      query: ({ groupId, memberId }) => ({
        url: `/groups/${groupId}/kick-out-member/${memberId}`, // Adjusted to use URL params
        method: "DELETE",
      }),
    }),

    joinPublicGroup: builder.mutation({
      query: (groupId) => ({
        url: `groups/join/${groupId}`,
        method: "POST",
      }),
      invalidatesTags: ['Join'],
    }),
    leaveGroup: builder.mutation({
      query: (groupId) => ({
        url: `groups/leave/${groupId}`,
        method: "POST",
      }),
      invalidatesTags:['Create','Join']
      
    }),

    joinPrivateGroup: builder.mutation({
      query: (groupId) => ({
        url: `groups/join-request-private/${groupId}`,
        method: "POST",
      }),
    }),
    cancelJoinRequest: builder.mutation({
      query: (groupId) => ({
        url: `groups/cancel-join-request/${groupId}`,
        method: "DELETE",
      }),
    }),

    /*     see all group join   request with user details  */
    getUsersWithJoinRequests: builder.query({
      query: ({ memberPage = 1, groupId }) =>
        `group/join-requests?page=${memberPage}&groupId=${groupId}`,
      providesTags:['AcceptJoinRequest']
    }),

    /* make decision for join group request */
    manageJoinGroupRequest: builder.mutation({
      query: ({ groupId, decision, sender_id }) => {
        return {
          url: "/managejoingrouprequest",
          method: "POST",
          body: { groupId, decision, sender_id },
        };
      },
      invalidatesTags:['AcceptJoinRequest']
    }),

    /*    get specific group posts approval requests*/
    getSpecificApprovalRwquestedGroupPosts: builder.query({
      query: ({ page = 1, groupId }) =>
        `getspecificgrouppostapprovalrequestes?page=${page}&id=${groupId}`, // Updated to include id
      providesTags:['ApprovePostOrReject']
    }),
    /*   approvePost group post */

    approvePost: builder.mutation({
      query: ({ groupId, postId }) => ({
        url: `/groups/${groupId}/posts/${postId}/approve`,
        method: "POST",
      }),
      invalidatesTags:['ApprovePostOrReject']
    }),

    rejectPostApproval: builder.mutation({
      query: ({ groupId, postId }) => ({
        url: `/groups/${groupId}/posts/${postId}/reject`,
        method: "DELETE",
      }),
      invalidatesTags:['ApprovePostOrReject']
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUpdateGroupDetailsMutation,
  useRejectPostApprovalMutation,
  useUserGroupPostInsertMutation,
  useApprovePostMutation,
  useGetSpecificApprovalRwquestedGroupPostsQuery,
  useManageJoinGroupRequestMutation,
  useGetUsersWithJoinRequestsQuery,
  useCancelJoinRequestMutation,
  useJoinPrivateGroupMutation,
  useJoinPublicGroupMutation,
  useLeaveGroupMutation,
  useGetJoinedGroupsButNotAdminRightQuery,
  useKickOutMemberMutation,
  useAddGroupAdminMutation,
  useGetAllGroupMemberManageQuery,
  useUpdateGroupNameMutation,
  useGetRandomGroupPostQuery,
  useGetGroupSuggestionQuery,
  useGetGroupsWhereAdminQuery,
  useGetAllGroupMemberQuery,
  useGetSpecificGroupPhotoQuery,
  useGetSpecificGroupPostQuery,
  useGetGroupDetailsQuery,
  useCreateGroupMutation,
  useGetJoinedGroupsButNotAdminQuery,
} = groupsApi;

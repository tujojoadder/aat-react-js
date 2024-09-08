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
  endpoints: (builder) => ({
    //Create groups
    createGroup: builder.mutation({
      query: (groupData) => ({
        url: "/group/create",
        method: "POST",
        body: groupData,
      }),
    }),

    // Define your API slice
    getJoinedGroupsButNotAdmin: builder.query({
      // Accept a parameter for the page number
      query: (page = 1) => `/groups/joined-not-admin?page=${page}`,
    }),


    // Define your API slice
getGroupsWhereAdmin: builder.query({
  // Remove the page parameter since pagination is no longer needed
  query: (page = 1) => `/groups/joined-admin?page=${page}`,
}),


    // Define your API slice
    getGroupSuggestion: builder.query({
      // Accept a parameter for the page number
      query: (page = 1) => `/groups/suggestions?page=${page}`,
    }),

    //get specific group details
    getGroupDetails: builder.query({
      query: (id) => `/groupdetails/${id}`, // Make sure this endpoint exists in your backend
    }),

    /* get specific usrer frien for profile */
    getSpecificGroupPeople: builder.query({
      query: ({ friendPage = 1, groupId }) =>
        `getspecificuserfriendids?page=${friendPage}&id=${groupId}`, // Updated to include id
    }),

    /*    get specific group posts */
    getSpecificGroupPost: builder.query({
      query: ({ page = 1, groupId }) =>
        `getspecificgroupposts?page=${page}&id=${groupId}`, // Updated to include id
    }),

    /*    get specific usrer images for profile */
    getSpecificGroupPhoto: builder.query({
      query: ({ photoPage = 1, groupId }) =>
        `getspecificgroupphotos?page=${photoPage}&id=${groupId}`, // Updated to include id
    }),

    /* get member of group*/
    getAllGroupMember: builder.query({
      query: ({ memberPage = 1, groupId }) =>
        `getspecificgroupmember?page=${memberPage}&id=${groupId}`, // Updated to include id
    }),
    /* get member of group for manage*/
    getAllGroupMemberManage: builder.query({
      query: ({ memberPage = 1, groupId }) =>
        `getspecificgroupmembermanage?page=${memberPage}&id=${groupId}`, // Updated to include id
    }),
    /*  get random post */
    getRandomGroupPost: builder.query({
      query: (page = 1) => `group/randomposts?page=${page}`, // Updated to include id
    }),


    /* updateGroupName */
    updateGroupName: builder.mutation({
      query: ({ groupId, name }) => ({
        url: `groups/${groupId}/update/name`,
        method: 'PUT',
        body: { name },
      }),
    }),

    /* updateGroupDetails */
    updateGroupDetails: builder.mutation({
      query: ({ groupId, details }) => ({
        url: `groups/${groupId}/update/details`,
        method: 'PUT',
        body: { details },
      }),
    }),


    addGroupAdmin: builder.mutation({
      query: ({ groupId, newMember }) => ({
        url: `/groups/${groupId}/add-admin/${newMember}`,
        method: 'POST',
      }),
    }),





  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUpdateGroupDetailsMutation,
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

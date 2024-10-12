// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Retrieve the token from cookies
const userToken = Cookies.get("userToken");

// Define a service using a base URL and expected endpoints

export const pagesApi = createApi({
  reducerPath: "pagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers) => {
      if (userToken) {
        headers.set("authorization", `Bearer ${userToken}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Create","Join"],
  endpoints: (builder) => ({
    createPage: builder.mutation({
      query: (pageData) => ({
        url: "create-page", // The endpoint URL in your backend
        method: "POST",
        body: pageData,
      }),
      invalidatesTags: ["Create"],
    }),

    // get pages where auth user is admin
    getPagesWhereAdmin: builder.query({
      query: (page = 1) => `get-pages-where-admin?page=${page}`, // Adjust the endpoint URL as needed
      providesTags:["Create"]
    }),
    // get liked pages
    getLikedPages: builder.query({
      query: (page = 1) => `get-pages-liked?page=${page}`, // Adjust the endpoint URL as needed
      providesTags:["Join"]
    }),
    // get liked pages
    getPageSuggestion: builder.query({
      query: (page = 1) => `get-pages-suggestion?page=${page}`, // Adjust the endpoint URL as needed
      providesTags :['Join']
    }),

    //get specific group details
    getPageDetails: builder.query({
      query: (id) => `/pagedetails/${id}`, // Make sure this endpoint exists in your backend
    }),

    /*    get specific group posts */
    getSpecificPagePost: builder.query({
      query: ({ page = 1, pageId }) =>
        `getspecificpageposts?page=${page}&id=${pageId}`, // Updated to include id
    }),

    /*    get specific usrer images for profile */
    getSpecificPagePhoto: builder.query({
      query: ({ photoPage = 1, pageId }) =>
        `getspecificpagephotos?page=${photoPage}&id=${pageId}`, // Updated to include id
    }),

    /* get member of page*/
    getAllPageMember: builder.query({
      query: ({ memberPage = 1, pageId }) =>
        `getspecificpagemember?page=${memberPage}&id=${pageId}`, // Updated to include id
    }),

    joinPage: builder.mutation({
      query: (pageId) => ({
        url: `page/join/${pageId}`,
        method: "POST",
      }),
      invalidatesTags:["Join"]
    }),
    leavePage: builder.mutation({
      query: (pageId) => ({
        url: `page/leave/${pageId}`,
        method: "POST",
      }),
      invalidatesTags:["Join"]
    }),

    /* updatePageName */
    updatePageName: builder.mutation({
      query: ({ pageId, name }) => ({
        url: `pages/${pageId}/update/name`,
        method: "PUT",
        body: { name },
      }),
    }),

    /* updateGroupDetails */
    updatePageDetails: builder.mutation({
      query: ({ pageId, details }) => ({
        url: `pages/${pageId}/update/details`,
        method: "PUT",
        body: { details },
      }),
    }),
    /* updateGroupDetails */
    updatePageLocation: builder.mutation({
      query: ({ pageId, location }) => ({
        url: `pages/${pageId}/update/location`,
        method: "PUT",
        body: { location },
      }),
    }),

    /* updateGroupDetails */
    updatePagePhone: builder.mutation({
      query: ({ pageId, phone }) => ({
        url: `pages/${pageId}/update/phone`,
        method: "PUT",
        body: { phone },
      }),
    }),
    /* updateGroupDetails */
    updatePageEmail: builder.mutation({
      query: ({ pageId, email }) => ({
        url: `pages/${pageId}/update/email`,
        method: "PUT",
        body: { email },
      }),
    }),

    /* get member of page on manage*/
    getAllPageMemberForManage: builder.query({
      query: ({ memberPage = 1, pageId }) =>
        `getspecificpagememberformanage?page=${memberPage}&id=${pageId}`, // Updated to include id
    }),

    addPageAdmin: builder.mutation({
      query: ({ pageId, newMember }) => ({
        url: `/page/${pageId}/add-admin/${newMember}`,
        method: "POST",
      }),
    }),

    kickOutPageMember: builder.mutation({
      query: ({ pageId, memberId }) => ({
        url: `/page/${pageId}/kick-out-member/${memberId}`, // Adjusted to use URL params
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreatePageMutation,
  useAddPageAdminMutation,
  useKickOutPageMemberMutation,
  useGetAllPageMemberForManageQuery,
  useUpdatePageEmailMutation,
  useUpdatePageLocationMutation,
  useUpdatePagePhoneMutation,
  useUpdatePageDetailsMutation,
  useUpdatePageNameMutation,
  useJoinPageMutation,
  useLeavePageMutation,
  useGetSpecificPagePhotoQuery,
  useGetAllPageMemberQuery,
  useGetSpecificPagePostQuery,
  useGetPageDetailsQuery,
  useGetPageSuggestionQuery,
  useGetLikedPagesQuery,
  useGetPagesWhereAdminQuery,
} = pagesApi;

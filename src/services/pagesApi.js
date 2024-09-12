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

  endpoints: (builder) => ({
    createPage: builder.mutation({
      query: (pageData) => ({
        url: "create-page", // The endpoint URL in your backend
        method: "POST",
        body: pageData,
      }),
    }),

    // get pages where auth user is admin
    getPagesWhereAdmin: builder.query({
      query: (page = 1) => `get-pages-where-admin?page=${page}`, // Adjust the endpoint URL as needed
    }),
    // get liked pages
    getLikedPages: builder.query({
      query: (page = 1) => `get-pages-liked?page=${page}`, // Adjust the endpoint URL as needed
    }),
    // get liked pages
    getPageSuggestion: builder.query({
      query: (page = 1) => `get-pages-suggestion?page=${page}`, // Adjust the endpoint URL as needed
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



    
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreatePageMutation,
  useGetSpecificPagePhotoQuery,
  useGetAllPageMemberQuery,
  useGetSpecificPagePostQuery,
  useGetPageDetailsQuery,
  useGetPageSuggestionQuery,
  useGetLikedPagesQuery,
  useGetPagesWhereAdminQuery,
} = pagesApi;

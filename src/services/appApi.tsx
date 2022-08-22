import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001"
  }),
  endpoints: (builder) => ({
    //creating user
    signupUser: builder.mutation({
      query: (user) => ({
        url: "/user/",
        method: "POST",
        body: user
      })
    }),
    //loging in user
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/user/login",
        method: "POST",
        body: user
      })
    }),
    //logout
    logoutUser: builder.mutation({
      query: (payload) => ({
        url: "/logout",
        method: "DELETE",
        body: payload
      })
    })
  })
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation
} = appApi;

export default appApi;

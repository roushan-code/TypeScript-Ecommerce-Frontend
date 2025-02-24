import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AllUsersResponse, DeleteUserRequest, MessageResponse, UserResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";

export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/` }),
    tagTypes: ["users"],
    endpoints: (builder) => ({
        login: builder.mutation<MessageResponse, User>({
            query: (user) => ({
                url: "newUser",
                method: "POST",
                body: user,
                credentials: "include"
            }),
            invalidatesTags: ['users']
        }),
        deleteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
            query: ({userId, adminUserId}) => ({
                url: `${userId}?id=${adminUserId}`,
                method: "DELETE",
                credentials: "include"
            }),
            invalidatesTags: ['users']
        }),
        allUsers: builder.query<AllUsersResponse, string>({
            query: (id) => ({url: `all?id=${id}`, credentials: "include"}),
            providesTags: ["users"],
            }),
    }),
});

export const getUser = async (id: string) => {
    try{
        const {data}: {data: UserResponse} = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/${id}`, {withCredentials: true});
        return data;
    }catch(e){
        console.log(e);
        throw e;
    }
}


export const { useLoginMutation, useDeleteUserMutation, useAllUsersQuery } = userAPI;
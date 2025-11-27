import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {  User } from '../../types/Types';
import { apiDomain } from '../../apiDomain/ApiDomain';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
        prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).authSlice?.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
}),
    tagTypes: ['Users'],
    endpoints: (builder) => ({

        // Fetch all Orders
        getAllUsers: builder.query<User[], void>({
            query: () => '/users',
            providesTags: ['Users'],
        }),        

        //get order by id
        getUserById: builder.query<User, number >({
            query: (user_id ) => `/users/${user_id}`,
            providesTags: ['Users'],
        }),

        //update user details
        updateUsersDetails: builder.mutation<{ message: string }, { user_id: number } & Partial<Omit<User, 'user_id' | 'user_type' | 'created_at'>>>({
            query: ({ user_id, ...updateUser }) => ({
                url: `/users/${user_id}`,
                method: 'PUT',
                body: updateUser,
            }),
            invalidatesTags: ['Users'],
        }),

        //update user_type
        updateUserTypeStatus:builder.mutation<{message:string},{user_id:number,user_type:string}>({
            query:({user_id,...updateUserType})=>({
                url:`/user/user-status/${user_id}`,
                method: 'PATCH',
                body: updateUserType,
            }),
            invalidatesTags:['Users']
        }),

    }),
})     

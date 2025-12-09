import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '../../types/Types';
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

    // ✅ Fetch all users
    getAllUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),

    // ✅ Get user by id
    getUserById: builder.query<User, number>({
      query: (user_id) => `/users/${user_id}`,
      providesTags: ['Users'],
    }),

    // ✅ Update user details
    updateUsersDetails: builder.mutation<
      { message: string },
      { user_id: number } & Partial<Omit<User, 'user_id' | 'user_type' | 'created_at'>>
    >({
      query: ({ user_id, ...updateUser }) => ({
        url: `/users/${user_id}`,
        method: 'PUT',
        body: updateUser,
      }),
      invalidatesTags: ['Users'],
    }),

    // ✅ Update user type
    updateUserTypeStatus: builder.mutation<
      { message: string },
      { user_id: number; user_type: string }
    >({
      query: ({ user_id, ...updateUserType }) => ({
        url: `/users/${user_id}/unban`,
        method: 'PATCH',
        body: updateUserType,
      }),
      invalidatesTags: ['Users'],
    }),

    // ✅✅✅ ADD THIS — BAN USER (THIS MAKES YOUR BUTTON WORK)
    banUser: builder.mutation<
      { message: string },
      { user_id: number }
    >({
      query: ({ user_id }) => ({
        url: `/users/${user_id}/ban`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Users'],
    }),

    // ✅✅✅ ADD THIS — UNBAN USER (OPTIONAL BUT IMPORTANT)
    unbanUser: builder.mutation<
      { message: string },
      { user_id: number }
    >({
      query: ({ user_id }) => ({
        url: `/users/${user_id}/unban`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Users'],
    }),

  }),
});

// ✅✅✅ EXPORT THESE TWO (VERY IMPORTANT)
export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUsersDetailsMutation,
  useUpdateUserTypeStatusMutation,

  // ✅ THESE MAKE THE BUTTON FUNCTIONAL
  useBanUserMutation,
  useUnbanUserMutation,
} = userApi;

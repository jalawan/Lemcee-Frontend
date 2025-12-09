import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AdminDashboardStats, UserStats } from '../../types/Types';
import { apiDomain } from '../../apiDomain/ApiDomain';


export const dashboardDataApi = createApi({
    reducerPath: 'dashboardDataApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
    tagTypes: ['DashboardData'],
    endpoints: (builder) => ({
        // Fetch admin data
        getAdminDashboardData: builder.query<AdminDashboardStats, void>({
            query: () => '/admin-dashboard',
            providesTags: ['DashboardData'],
        }),

        //get user data by user_id
        getUserDashboardById: builder.query<UserStats,  number >({
            query: (user_id) => `/dashboard/${user_id}`,
            providesTags: ['DashboardData'],
        }),
    }),
})                                                                                                                                                                                                                                                                                                        
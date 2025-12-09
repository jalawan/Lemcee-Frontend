import React from "react";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiDomain } from '../../apiDomain/ApiDomain';
import type { RootState } from '../../store/store';
import type{ Bookings} from '../../types/Types'

const ReportsApi = createApi({
  reducerPath: 'reportsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authSlice.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMostBookedVehicles: builder.query<Bookings[], void>({
      query: () => '/reports/vehicles',
    }),
    getMonthlyRevenue: builder.query<Bookings[], void>({
      query: () => '/reports/revenue',
    }),
  }),
});

export default ReportsApi

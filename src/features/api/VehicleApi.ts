import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Vehicles ,VehicleSpecifications } from '../../types/Types';
import { apiDomain } from '../../apiDomain/ApiDomain';


export const VehicleApi = createApi({
    reducerPath: 'VehicleApi',
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
    tagTypes: ['vehicle'],
    endpoints: (builder) => ({



        //Fetch all vehicle Items
        getAllvehicle: builder.query<Vehicles[], void>({
            query: () => '/vehicles',
            providesTags: ['vehicle'], 
        }),

        //get vehicle by id
        getvehicleById: builder.query<VehicleSpecifications, number>({
      query: (id) => `/vehicles/${id}`, // backend route: GET /vehicles/:id
      providesTags: ['vehicle'],
        }),

        //add new vehicle item
        addvehicle: builder.mutation<{ message: string }, Partial<Omit<Vehicles, 'vehicle_id'>>>({
            query: (newItem) => ({
                url: '/vehicles',
                method: 'POST',
                body: newItem,
            }),
            invalidatesTags: ['vehicle'],
        }),
        //update vehicle item
        updatevehicle: builder.mutation<{ message: string }, { vehicle_id: number } & Partial<Omit<Vehicles, 'vehicle_id'>>>({
            query: ({ vehicle_id, ...updatedItem }) => ({
                url: `/vehicles/${vehicle_id}`,
                method: 'PUT',
                body: updatedItem,
            }),
            invalidatesTags: ['vehicle'],
        }),
        //delete vehicle item
        deletevehicle: builder.mutation<{ message: string }, {vehicle_id: number}>({
            query: (vehicle_id) => ({
                url: `/vehicles/${vehicle_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['vehicle'],
        }),
    }),
})                                                                                                                                                                                                                                                                                                        
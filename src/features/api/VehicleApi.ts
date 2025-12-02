import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Vehicles, VehicleSpecifications } from '../../types/Types'
import { apiDomain } from '../../apiDomain/ApiDomain'

export const VehicleApi = createApi({
  reducerPath: 'VehicleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).authSlice?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['vehicle', 'vehicleSpec'],
  endpoints: (builder) => ({

    // ================= VEHICLES =================

    getAllvehicle: builder.query<Vehicles[], void>({
      query: () => '/vehicles',
      providesTags: ['vehicle'],
    }),

    getvehicleById: builder.query<Vehicles, number>({
      query: (vehicle_id) => `/vehicles/${vehicle_id}`,
      providesTags: ['vehicle'],
    }),

    addvehicle: builder.mutation<{ message: string }, Omit<Vehicles, 'vehicle_id'>>({
      query: (newVehicle) => ({
        url: '/vehicles',
        method: 'POST',
        body: newVehicle,
      }),
      invalidatesTags: ['vehicle'],
    }),

    updatevehicle: builder.mutation<
      { message: string },
      { vehicle_id: number } & Partial<Vehicles>
    >({
      query: ({ vehicle_id, ...updatedItem }) => ({
        url: `/vehicles/${vehicle_id}`,
        method: 'PUT',
        body: updatedItem,
      }),
      invalidatesTags: ['vehicle'],
    }),

    deletevehicle: builder.mutation<{ message: string }, number>({
      query: (vehicle_id) => ({
        url: `/vehicles/${vehicle_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['vehicle'],
    }),

    // ================= VEHICLE SPECIFICATIONS =================

    getAllVehicleSpecs: builder.query<VehicleSpecifications[], void>({
      query: () => '/vehicleSpec',
      providesTags: ['vehicleSpec'],
    }),

    addVehicleSpec: builder.mutation<{ message: string }, VehicleSpecifications>({
      query: (newSpec) => ({
        url: '/vehicleSpec',
        method: 'POST',
        body: newSpec,
      }),
      invalidatesTags: ['vehicleSpec'],
    }),
  }),
})

// ✅ Auto-generated hooks
export const {
  useGetAllvehicleQuery,
  useGetvehicleByIdQuery,
  useAddvehicleMutation,
  useUpdatevehicleMutation,
  useDeletevehicleMutation,

  useGetAllVehicleSpecsQuery,
  useAddVehicleSpecMutation
} = VehicleApi

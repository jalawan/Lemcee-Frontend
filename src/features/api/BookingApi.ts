import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Bookings} from '../../types/Types';
import { apiDomain } from '../../apiDomain/ApiDomain';

export const BookingApi = createApi({
    reducerPath: 'BookingApi',
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
    tagTypes: ['bookings'],
    endpoints: (builder) => ({
        
        //Fetch all Bookings
       getAllBookings :builder.query<Bookings[],void >({
        query:()=>'/bookings',
        providesTags:['bookings'],
       }),

       //create booking
      addNewBookingStatus:builder.mutation<{ message:string},Partial<Omit<Bookings,'booking_id'>>>({
        query:(newbooking)=>({
            url:'/bookings',
            method:'POST',
            body: newbooking,
        }),
        invalidatesTags:['bookings']
       }),
       //update order status
        updateBooking:builder.mutation<{ message: string }, { booking_id: number, status:string }>({
            query: ({ booking_id, ...updateBooking }) => ({
                url: `/bookings/${booking_id}`,
                method: 'PATCH',
                body: updateBooking,
            }),
            invalidatesTags: ['bookings'],
        }),
        //delete order
        deleteBooking: builder.mutation<{ message: string }, { booking_id: number }>({
            query: ({ booking_id }) => ({
                url: `/bookings/${booking_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['bookings'],
        }),
        //fetch 5 latest orders
        getLatestBookings: builder.query<Bookings[], void>({
            query: () => '/bookings/latest',
            providesTags: ['bookings'],
        }),

        //fetch all order for one customer using custome id
        getAllBookingsByUserId: builder.query<Omit<Bookings[], 'user_email' | 'user_name'>,  number>({
            query: (user_id) => `/bookings/user/${user_id}`,
            providesTags: ['bookings']
        }),

        //get order by id
        getBookingrById: builder.query<Bookings, {booking_id: number }>({
            query: ({ booking_id }) => `/bookings/${booking_id}`,
            providesTags: ['bookings'],
        }),

    // cancel booking 
        cancelBooking: builder.mutation<{ message: string }, { booking_id: number; status?: string }>({
        query: ({ booking_id, ...cancelBooking }) => ({
            url: `/payments/bookings/${booking_id}`,
            method: 'PATCH',
            body: cancelBooking,
        }),
        invalidatesTags: ['bookings'],
        }),


    })
})
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
        query:()=>'/Bookings',
        providesTags:['bookings'],
       }),

       //create booking
      addNewBooking:builder.mutation<{ message:string},Partial<Omit<Bookings,'booking_id'>>>({
        query:(newbooking)=>({
            url:'/bookings',
            method:'POST',
            body: newbooking,
        }),
        invalidatesTags:['bookings']
       })

    })
})
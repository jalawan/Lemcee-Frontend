import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiDomain } from '../../apiDomain/ApiDomain'
import type { RootState } from '../../store/store'

/* ✅ PAYMENT TYPE */
export interface Payment {
  payment_id: number
  booking_id: number
  amount: number
  payment_status: string
  payment_date?: string
  payment_method: string
  transaction_id: string
  created_at: string
  updated_at: string
}

export const PaymentsApi = createApi({
  reducerPath: 'PaymentsApi',
  baseQuery: fetchBaseQuery({
  baseUrl: apiDomain,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authSlice.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
}),

  tagTypes: ['Payment', 'Ticket','bookings'],

  endpoints: (builder) => ({
    /* ===================== PAYMENTS ===================== */

    // ✅ GET ALL PAYMENTS
    getAllPayments: builder.query<Payment[], void>({
      query: () => '/payments',
      providesTags: ['Payment'],
    }),

    // ✅ CREATE PAYMENT
    addPayment: builder.mutation<{ message: string }, Partial<Payment>>({
      query: (payment) => ({
        url: '/payments',
        method: 'POST',
        body: payment,
      }),
      invalidatesTags: ['Payment'],
    }),

    // ✅ UPDATE PAYMENT STATUS (CONFIRM PAYMENT)
    updatePayment: builder.mutation<
      { message: string },
      { payment_id: number; payment_status: string }
    >({
      query: ({ payment_id, ...body }) => ({
        url: `/payments/${payment_id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Payment'],
    }),
// confirms
     confirmPayment: builder.mutation<
     { message: string }, 
     {payment_id:number ;payment_status:string}
     >({
      query: ({payment_id}) => ({
        url: `/payments/${payment_id}/confirm`,
        method: 'POST', // usually POST for confirm actions
      }),
      invalidatesTags: ['Payment'],
    }),
  


    // ✅ DELETE PAYMENT
    deletePayment: builder.mutation<
      { message: string },
      { payment_id: number }
    >({
      query: ({ payment_id }) => ({
        url: `/payments/${payment_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Payment'],
    }),

    //refund payment
    refundPayment: builder.mutation<any, { payment_id: number; booking_id: number; amount:number }>({
  query:({ payment_id, booking_id, amount })=> ({
    url: "/payments/refund",
    method: "POST",
    body:{ payment_id, booking_id, amount }
  }),
  invalidatesTags: ["Payment", "Ticket" ,'bookings'],
}),

  }),
})

/* ✅ EXPORTED HOOKS */
export const {
  useGetAllPaymentsQuery,
  useAddPaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = PaymentsApi

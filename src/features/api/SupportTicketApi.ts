// features/api/SupportTicketApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiDomain } from "../../apiDomain/ApiDomain";

export type TicketStatus = "Open" | "Responded" | "Closed";
export { apiDomain } from '../../apiDomain/ApiDomain'


export interface SupportTicketCreateDto {
  user_id: number;
  booking_id?: number | null;
  subject: string;
  description: string;
}

export interface SupportTicketResponse {
  ticket_id: number;
  user_id: number;
  booking_id?: number | null;
  subject: string;
  description: string;
  admin_reply?: string | null;
  status: string |null;
  created_at: string;
  updated_at: string;
  // optionally, joined user details if your backend returns them
  user?: {
    user_id: number;
    first_name?: string;
    last_name?: string;
    email?: string;
  } | null;
}

export const SupportTicketApi = createApi({
  reducerPath: "SupportTicketApi",
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
    
  tagTypes: ["Tickets"],
  endpoints: (builder) => ({

  // GET ALL TICKETS
    getAllTickets: builder.query<SupportTicketResponse[], void>({
      query: () => '/supportTickets',
      providesTags: ['Tickets'],
    }),
    
    //create ticket
    createTicket: builder.mutation<string, SupportTicketCreateDto>({
      query: (body) => ({
        url: "/supportTickets",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tickets"],
    }),

    getUserTickets: builder.query<SupportTicketResponse[], number>({
      query: (user_id) => `/supportTickets/user/${user_id}`,
      providesTags: (result) =>
        result ? [...result.map((t) => ({ type: "Tickets" as const, id: t.ticket_id })), { type: "Tickets", id: "LIST" }] : [{ type: "Tickets", id: "LIST" }],
    }),

    updateTicket: builder.mutation<string, { ticket_id: number; subject: string; description: string; status?:string; admin_reply?:string}>({
      query: ({ ticket_id, ...body }) => ({
        url: `/supportTickets/${ticket_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ['Tickets'],
    }),

    deleteTicket: builder.mutation<string, number>({
      query: (ticket_id) => ({
        url: `/supportTickets/${ticket_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Tickets'],
    }),

    replyToTicket: builder.mutation<string, { ticket_id: number; admin_reply: string }>({
      query: ({ ticket_id, admin_reply }) => ({
        url: `/supportTickets/${ticket_id}`,
        method: "PUT",
        body: { admin_reply },
      }),
      invalidatesTags: ['Tickets'],
    }),


  }),
});

export const {
  useCreateTicketMutation,
  useGetUserTicketsQuery,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
  useReplyToTicketMutation,
  useGetAllTicketsQuery,
} = SupportTicketApi;
export default SupportTicketApi;

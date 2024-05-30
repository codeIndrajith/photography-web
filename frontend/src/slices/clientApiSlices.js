import { apiSlice } from './apiSlice';
const CLIENT_URL = '/api/client';

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginClient: builder.mutation({
      query: (data) => ({
        url: `${CLIENT_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logoutClient: builder.mutation({
      query: () => ({
        url: `${CLIENT_URL}/logout`,
        method: 'POST',
      }),
    }),
    registerClient: builder.mutation({
      query: (data) => ({
        url: `${CLIENT_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateClient: builder.mutation({
      query: (data) => ({
        url: `${CLIENT_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    bookingPhotographer: builder.mutation({
      query: (data) => ({
        url: `${CLIENT_URL}/hire-photographer`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginClientMutation,
  useLogoutClientMutation,
  useRegisterClientMutation,
  useUpdateClientMutation,
  useBookingPhotographerMutation,
} = clientApiSlice;

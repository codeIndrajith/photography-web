import { apiSlice } from './apiSlice';
const LOCATION_OWNER_URL = '/api/locationOwner';

export const locationOwnerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginOwner: builder.mutation({
      query: (data) => ({
        url: `${LOCATION_OWNER_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logoutOwner: builder.mutation({
      query: () => ({
        url: `${LOCATION_OWNER_URL}/logout`,
        method: 'POST',
      }),
    }),
    registerOwner: builder.mutation({
      query: (data) => ({
        url: `${LOCATION_OWNER_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateOwner: builder.mutation({
      query: (data) => ({
        url: `${LOCATION_OWNER_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginOwnerMutation,
  useLogoutOwnerMutation,
  useRegisterOwnerMutation,
  useUpdateOwnerMutation,
} = locationOwnerApiSlice;

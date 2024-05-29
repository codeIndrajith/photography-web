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
    addLocation: builder.mutation({
      query: (data) => ({
        url: `${LOCATION_OWNER_URL}/addLocation`,
        method: 'POST',
        body: data,
      }),
    }),
    getLocationsByOwners: builder.query({
      query: (id) => ({
        url: `${LOCATION_OWNER_URL}/getLocations/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginOwnerMutation,
  useLogoutOwnerMutation,
  useRegisterOwnerMutation,
  useUpdateOwnerMutation,
  useAddLocationMutation,
  useGetLocationsByOwnersQuery,
} = locationOwnerApiSlice;

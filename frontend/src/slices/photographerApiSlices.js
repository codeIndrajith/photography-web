import { apiSlice } from './apiSlice';
const PHOTOGRAPHER_URL = '/api/photographers';

export const photographerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${PHOTOGRAPHER_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${PHOTOGRAPHER_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${PHOTOGRAPHER_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${PHOTOGRAPHER_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    addPortfolioL: builder.mutation({
      query: (data) => ({
        url: `${PHOTOGRAPHER_URL}/addPortfolio`,
        method: 'POST',
        body: data,
      }),
    }),
    getPortfolio: builder.query({
      query: (photographerId) => ({
        url: `${PHOTOGRAPHER_URL}/getPortfolio/${photographerId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getPhotographer: builder.query({
      query: (id) => ({
        url: `${PHOTOGRAPHER_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    addBookingRequest: builder.mutation({
      query: (data) => ({
        url: `${PHOTOGRAPHER_URL}/add-booking`,
        method: 'POST',
        body: data,
      }),
    }),
    getBookingByPhotographer: builder.query({
      query: (photographerId) => ({
        url: `${PHOTOGRAPHER_URL}/get-booking/${photographerId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useAddPortfolioLMutation,
  useGetPortfolioQuery,
  useGetPhotographerQuery,
  useAddBookingRequestMutation,
  useGetBookingByPhotographerQuery,
} = photographerApiSlice;

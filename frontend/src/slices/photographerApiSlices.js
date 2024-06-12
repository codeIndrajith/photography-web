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
    updatePhotographer: builder.mutation({
      query: (data) => ({
        url: `${PHOTOGRAPHER_URL}/update-photographer`,
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
    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: `${PHOTOGRAPHER_URL}/delete-portfolio`,
        method: 'DELETE',
        body: { id },
      }),
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
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `${PHOTOGRAPHER_URL}/delete-booking`,
        method: 'DELETE',
        body: { id },
      }),
    }),
    getAllPhotographers: builder.query({
      query: () => ({
        url: `${PHOTOGRAPHER_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getRatings: builder.query({
      query: (photographerId) => ({
        url: `${PHOTOGRAPHER_URL}/get-rating/${photographerId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdatePhotographerMutation,
  useAddPortfolioLMutation,
  useGetPortfolioQuery,
  useDeletePortfolioMutation,
  useGetPhotographerQuery,
  useAddBookingRequestMutation,
  useGetBookingByPhotographerQuery,
  useDeleteBookingMutation,
  useGetAllPhotographersQuery,
  useGetRatingsQuery,
} = photographerApiSlice;

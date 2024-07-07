import { apiSlice } from './apiSlice';
const PH_CLUB_URL = '/api/ph-club';

export const phClubApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginPhClub: builder.mutation({
      query: (data) => ({
        url: `${PH_CLUB_URL}/phClub-auth`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginPhClubMutation } = phClubApiSlice;

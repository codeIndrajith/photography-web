import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('phClubInfo')
    ? JSON.parse(localStorage.getItem('phClubInfo'))
    : null,
};

const authPhClub = createSlice({
  name: 'phClub',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.phClubInfo = action.payload;
      localStorage.setItem('phClubInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.phClubInfo = null;
      localStorage.removeItem('phClubInfo');
    },
  },
});

export const { setCredentials, logout } = authPhClub.actions;
export default authPhClub.reducer;

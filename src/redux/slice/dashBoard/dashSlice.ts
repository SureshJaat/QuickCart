import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { getPrdouctListData } from './dashAction';

const initialState: any = {
  loading: false,

};

export const DashBoardSlice = createSlice({
  name: 'dashBoard',
  initialState,
  reducers: {
    setDashboardPayload: (state, { payload }) => {
      const { key, value } = payload;
      state.dashBoardPayload[`${key}`] = value;
      console.log(state.dashBoardPayload)
    },
  },
  extraReducers: builder => {
    builder.addCase(getPrdouctListData.pending, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export const {
  setDashboardPayload,
} = DashBoardSlice.actions;


export default DashBoardSlice.reducer;

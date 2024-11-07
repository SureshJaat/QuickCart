import { createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import dashBoard from '../../../api/services/dashBoard';

interface LoginPayload {
  loginType: string;
  role: string;
  email: string;
  password: string;
  deviceToken: string;
}
interface LoginResponse {
  total: any;
  skip: any;
  products: any;
  data: { [x: string]: string };
  code: number;
  message: string;
}


export const getPrdouctListData = createAsyncThunk<
  LoginResponse,
  any,
  { rejectValue: SerializedError }
>('user/getPrdouctListData', async (data: any, thunkApi: any) => {
  try {
    const response = await dashBoard.getDashBoardData(data);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error as SerializedError);
  }
});
export const getDashBoardDataBySearch = createAsyncThunk<
  LoginResponse,
  any,
  { rejectValue: SerializedError }
>('user/getDashBoardDataBySearch', async (data: any, thunkApi: any) => {
  try {
    const response = await dashBoard.getDashBoardDataBySearch(data);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error as SerializedError);
  }
});






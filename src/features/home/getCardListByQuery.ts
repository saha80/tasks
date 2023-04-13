import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getUserById = createAsyncThunk('getById', (userId: number) => {
  return userId;
});

interface UserState {
  entities: number[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const cardById = createSlice({
  name: 'cardById',
  initialState: {} as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserById.fulfilled, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      state.entities.push(action.payload);
    });
  },
});

export default cardById.reducer;

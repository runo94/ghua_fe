import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userService from '../services/user/user.service'

export const asyncEditUser = createAsyncThunk(
  'user/fetchEditUser',
  async (payload: any, thunkAPI) => {
    return await userService.update(payload.data, payload.accessToken)
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    updated: false
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state
    // as needed
    builder.addCase(asyncEditUser.fulfilled, (state) => {
      // Add user to the state array
      state.updated = true
    })
  }
})

export const {} = userSlice.actions

export default userSlice.reducer
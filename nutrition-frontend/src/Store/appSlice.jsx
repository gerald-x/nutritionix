import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: null,
  refreshToken: null,
}

export const appSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    storeAccesstoken: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.accessToken = action.payload
    },

    storeRefreshToken: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.refreshToken = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { storeAccesstoken, storeRefreshToken } = appSlice.actions

export default appSlice.reducer
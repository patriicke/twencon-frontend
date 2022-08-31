import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    addNotifications: (state: any, { payload }) => {
      if (state.newMessages[payload]) {
        state.newMessages[payload] = state.newMessages[payload] + 1;
      } else {
        state.newMessages[payload] = 1;
      }
    },
    resetNotifications: (state: any, { payload }) => {
      delete state.newMessages[payload];
    },
    userDataAction: (state: any, action) => {
      return {
        ...state,
        userData: action.payload
      };
    }
  }
});

export const { addNotifications, resetNotifications, userDataAction } =
  userSlice.actions;
export default userSlice.reducer;
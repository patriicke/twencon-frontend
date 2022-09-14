import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    addNotifications: (state: any, { payload }) => {
      if (state.userData.newMessages[payload]) {
        state.userData.newMessages[payload] =
          state.userData.newMessages[payload] + 1;
      } else {
        state.userData.newMessages[payload] = 1;
      }
    },
    resetNotifications: (state: any, { payload }) => {
      delete state.userData.newMessages[payload];
    },
    userDataAction: (state: any, action) => {
      return {
        ...state,
        userData: action.payload
      };
    },
    postsActions: (state: any, action) => {
      return {
        ...state,
        posts: action.payload
      };
    }
  }
});

export const {
  addNotifications,
  resetNotifications,
  userDataAction,
  postsActions
} = userSlice.actions;
export default userSlice.reducer;

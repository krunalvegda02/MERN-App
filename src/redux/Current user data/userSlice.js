import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userData: null,
};

export const userSlice = createSlice({
  name: "currUser",
  initialState,
  reducers: {
    setLogin: (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload;
      },
      setLogOut: (state) => {
        state.isAuthenticated = false;
        state.userData = null;
      },
    // getCurretUserId:
  },
});

export const { setLogin, setLogOut } = userSlice.actions;
export default userSlice.reducer;
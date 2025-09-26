import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "Test",
  initialState: {
    state: "test",
  },
  reducers: {
    changeTest: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
  },
});

export default testSlice.reducer;
export const { changeTest } = testSlice.actions;

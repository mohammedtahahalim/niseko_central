import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchNews = createAsyncThunk("news/thunk", async () => {});

interface NewsState {
  loading: boolean;
  error: string | null;
  latestNews: any[];
}

const initialState: NewsState = {
  loading: false,
  error: null,
  latestNews: [],
};

const NewsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, () => {});
    builder.addCase(fetchNews.rejected, () => {});
    builder.addCase(fetchNews.fulfilled, () => {});
  },
});

export default NewsSlice.reducer;

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { TLanguage } from "../languages/changeLanguage";

type NewsArticle = Record<TLanguage, string> & { image: string };

type NewsData = NewsArticle[];

interface FetchNewsProps {
  queries?: Record<string, string | number>;
  options?: RequestInit;
}

const newsSchema = z.record(
  z.string(),
  z.object({ title: z.string(), image: z.string() }).or(z.string())
);

export const fetchNews = createAsyncThunk<
  NewsData,
  FetchNewsProps | null,
  { rejectValue: string }
>("news/thunk", async (args, { signal, rejectWithValue }) => {
  const { queries, options } = args ?? {};
  const fullQueries = new URLSearchParams(
    Object.entries(queries ?? {})
      .filter(([_, v]) => v !== null && v !== undefined)
      .map(([k, v]) => [k, String(v)])
  );
  const fullURL: string = `${
    import.meta.env.VITE_API_URL
  }/api/latestnews?${fullQueries}`;
  const fullOptions: RequestInit = {
    method: "get",
    signal,
    ...options,
  };
  try {
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    const rawData = await response.json();
    const data = (rawData.latestNews as NewsData).filter(
      (news) => newsSchema.safeParse(news).success
    );
    return data;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("network");
    }
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("unknown");
  }
});

interface NewsState {
  newsLoading: boolean;
  error: string | null;
  latestNews: NewsData;
}

const initialState: NewsState = {
  newsLoading: false,
  error: null,
  latestNews: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.newsLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchNews.rejected,
      (state, action: PayloadAction<string | void>) => {
        state.newsLoading = false;
        state.error = action.payload ?? null;
      }
    );
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.newsLoading = false;
      state.latestNews = action.payload;
    });
  },
});

export default newsSlice.reducer;

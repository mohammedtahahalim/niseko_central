import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";

interface FetchNewsProps {
  queries?: Record<string, string | number>;
  options?: RequestInit;
}

const newsSchema = z.object({
  id: z.number(),
  image: z.string(),
  blur_image: z.string(),
  article: z.object({
    en: z.object({ title: z.string() }),
    ar: z.object({ title: z.string() }),
    ja: z.object({ title: z.string() }),
    fr: z.object({ title: z.string() }),
  }),
});

type NewsData = z.infer<typeof newsSchema>;

export const fetchNews = createAsyncThunk<
  NewsData[],
  FetchNewsProps | null,
  { rejectValue: string }
>("news/thunk", async (args, { signal, rejectWithValue }) => {
  const { queries, options } = args ?? {};
  const fullQueries = new URLSearchParams(
    Object.entries(queries ?? {})
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, v]) => v !== null && v !== undefined)
      .map(([k, v]) => [k, String(v)])
  ).toString();
  const fullURL: string = `${import.meta.env.VITE_API_URL}/api/news${
    fullQueries ? "?" + fullQueries : ""
  }`;
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
    const data = (rawData.news as NewsData[]).filter(
      (news) => newsSchema.safeParse(news).success
    );
    return data as NewsData[];
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
  news: NewsData[];
}

const initialState: NewsState = {
  newsLoading: false,
  error: null,
  news: [],
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
      state.news = action.payload;
    });
  },
});

export default newsSlice.reducer;

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";

const articleSchema = z.object({
  category: z.string(),
  deals: z.array(
    z.object({
      id: z.number(),
      image: z.string(),
      title: z.string(),
      subtitle: z.string(),
      content: z.string(),
      blur_image: z.string(),
    })
  ),
});

export type ConciergeArticle = z.infer<typeof articleSchema>;

interface ConciergeProps {
  queries: Record<string, string | number>;
}

interface ConciergeSlice {
  loading: boolean;
  error: string | null;
  articles: ConciergeArticle[] | null;
}

export const fetchConcierge = createAsyncThunk<
  ConciergeArticle[],
  ConciergeProps | void,
  { rejectValue: string }
>("concierge/thunk", async (_args, { rejectWithValue, signal }) => {
  const fullQueries = _args
    ? new URLSearchParams(
        Object.entries(_args)
          .filter(([_, v]) => v !== null && v !== undefined)
          .map(([k, v]) => [k, String(v)])
      ).toString()
    : "";
  const fullURL: string = `${import.meta.env.VITE_API_URL}/api/concierge${
    fullQueries && "?" + fullQueries
  }`;
  try {
    const response = await fetch(fullURL, { signal });
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    const raw_data = await response.json();
    const data = raw_data.articles.filter(
      (article: ConciergeArticle) => articleSchema.safeParse(article).success
    );
    return data;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("Network Request Aborted ...");
    }
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Unknown Error ...");
  }
});

const initialState: ConciergeSlice = {
  loading: false,
  error: null,
  articles: null,
};

export const conciergeSlice = createSlice({
  name: "concierge/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConcierge.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchConcierge.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Unknown Error";
      }
    );
    builder.addCase(
      fetchConcierge.fulfilled,
      (state, action: PayloadAction<ConciergeArticle[]>) => {
        state.loading = false;
        state.error = null;
        state.articles = action.payload;
      }
    );
  },
});

export default conciergeSlice.reducer;

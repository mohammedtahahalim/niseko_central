import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";

const TTL = import.meta.env.VITE_TTL ?? 10000;

const refresh = (key: string) => {
  clearTimeout(timeouts[key]);
  timeouts[key] = setTimeout(() => {
    delete cache[key];
    delete timeouts[key];
  }, TTL);
};

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

const timeouts: Record<string, ReturnType<typeof setTimeout>> = {};
const cache: Record<string, ConciergeArticle[]> = new Proxy(
  {},
  {
    get(target: Record<string, ConciergeArticle[]>, key: string) {
      if (!(key in target)) return undefined;
      // Keep the data in memory as long as client keeps requesting
      refresh(key);
      return target[key];
    },
    set(
      target: Record<string, ConciergeArticle[]>,
      key: string,
      value: ConciergeArticle[]
    ) {
      refresh(key);
      target[key] = value;
      return true;
    },
  }
);

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
        Object.entries(_args.queries)
          .filter(([_, v]) => v !== null && v !== undefined)
          .map(([k, v]) => [k, String(v)])
          .sort(([a], [b]) => a.localeCompare(b))
      ).toString()
    : "";
  if (fullQueries in cache) {
    return cache[fullQueries];
  }
  const fullURL: string = `${import.meta.env.VITE_API_URL}/api/concierge${
    fullQueries && "?" + fullQueries
  }`;
  try {
    const response = await fetch(fullURL, { signal });
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    const raw_data = await response.json();
    // backend is inconsistent and might send data that breaks the ui, so we filter to only element that respect our schema
    const data = raw_data.articles.filter(
      (article: ConciergeArticle) => articleSchema.safeParse(article).success
    );
    cache[fullQueries] = data;
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
  articles: null, // this is used to render skeleton ui, as [] reverts to truthy values
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

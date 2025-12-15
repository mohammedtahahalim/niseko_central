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

const fullSchema = z.object({
  category: z.string(),
  articles: z.array(
    z.object({
      id: z.number(),
      image: z.string(),
      blur_image: z.string(),
      en: z.object({ title: z.string().nonempty() }),
      ja: z.object({ title: z.string().nonempty() }),
      ar: z.object({ title: z.string().nonempty() }),
      fr: z.object({ title: z.string().nonempty() }),
    })
  ),
});

const categorySchema = z.object({
  id: z.number().nonnegative(),
  category: z.string().nonempty(),
  image: z.string(),
  blur_image: z.string(),
  en: z.object({ title: z.string().nonempty() }),
  ja: z.object({ title: z.string().nonempty() }),
  ar: z.object({ title: z.string().nonempty() }),
  fr: z.object({ title: z.string().nonempty() }),
});

const articleSchema = z.object({
  id: z.number().nonnegative(),
  category: z.string().nonempty(),
  image: z.string(),
  blur_image: z.string(),
  en: z.object({
    title: z.string().nonempty(),
    prices: z.string().nonempty(),
    content: z.string().nonempty(),
  }),
  ja: z.object({
    title: z.string().nonempty(),
    prices: z.string().nonempty(),
    content: z.string().nonempty(),
  }),
  ar: z.object({
    title: z.string().nonempty(),
    prices: z.string().nonempty(),
    content: z.string().nonempty(),
  }),
  fr: z.object({
    title: z.string().nonempty(),
    prices: z.string().nonempty(),
    content: z.string().nonempty(),
  }),
});

export type fullArticle = z.infer<typeof fullSchema>;
export type categoryArticle = z.infer<typeof categorySchema>;
export type idArticle = z.infer<typeof articleSchema>;

type CombinedConcierge = fullArticle[] | categoryArticle[] | idArticle;

const timeouts: Record<string, ReturnType<typeof setTimeout>> = {};
const cache: Record<string, CombinedConcierge> = new Proxy(
  {},
  {
    get(target: Record<string, CombinedConcierge>, key: string) {
      if (!(key in target)) return undefined;
      // Keep the data in memory as long as client keeps requesting
      refresh(key);
      return target[key];
    },
    set(
      target: Record<string, CombinedConcierge>,
      key: string,
      value: CombinedConcierge
    ) {
      refresh(key);
      target[key] = value;
      return true;
    },
  }
);

interface ConciergeProps {
  queries?: Record<string, string | number>;
  type: "full" | "category" | "id";
}

interface ConciergeReturns {
  type: ConciergeProps["type"];
  content: CombinedConcierge;
}

interface ConciergeSlice {
  loading: boolean;
  error: string | null;
  type: ConciergeProps["type"];
  articles: CombinedConcierge | null;
}

export const fetchConcierge = createAsyncThunk<
  ConciergeReturns,
  ConciergeProps,
  { rejectValue: string }
>("concierge/thunk", async (_args, { rejectWithValue, signal }) => {
  const { type, queries } = _args;
  const fullQueries =
    new URLSearchParams(
      Object.entries(queries ?? {})
        .filter(([_, v]) => v !== null && v !== undefined)
        .map(([k, v]) => [k, String(v)])
        .sort(([a], [b]) => a.localeCompare(b))
    ).toString() || "";
  if (fullQueries in cache) {
    return { type, content: cache[fullQueries] };
  }
  const fullURL: string = `${import.meta.env.VITE_API_URL}/api/concierge${
    fullQueries && "?" + fullQueries
  }`;
  try {
    const response = await fetch(fullURL, { signal });
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    let raw_data = await response.json();
    raw_data = raw_data.article;
    // backend is inconsistent and might send data that breaks the ui, so we filter to only element that respect our schema
    let data;
    if (type === "id") {
      data = articleSchema.safeParse(raw_data) ? raw_data : null;
    }
    if (type === "category") {
      data = raw_data.filter(
        (elem: categoryArticle) => categorySchema.safeParse(elem).success
      );
    }
    if (type === "full") {
      data = raw_data.filter(
        (elem: fullArticle) => fullSchema.safeParse(elem).success
      );
    }
    cache[fullQueries] = data;
    return { type, content: data };
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
  type: "full",
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
      (state, action: PayloadAction<ConciergeReturns>) => {
        const { type, content } = action.payload;
        state.loading = false;
        state.error = null;
        state.articles = content;
        state.type = type;
      }
    );
  },
});

export default conciergeSlice.reducer;

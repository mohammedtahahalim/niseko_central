import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";

type FetchBlogArgs = Record<string, string | number>;

// Defensive checking to make sure component adhere to strict format for better UI
const blogsSchema = z.object({
  id: z.number().nonnegative(),
  date: z.string().nonempty(),
  image: z.string().nonempty(),
  blur_image: z.string().nonempty(),
  ar: z.object({ title: z.string().nonempty() }),
  en: z.object({ title: z.string().nonempty() }),
  ja: z.object({ title: z.string().nonempty() }),
  fr: z.object({ title: z.string().nonempty() }),
});

interface BlogReturn {
  blogs: z.infer<typeof blogsSchema>[];
  first_blog: z.infer<typeof blogsSchema> | null;
  page: number;
  page_size: number;
  total_blogs: number;
  total_pages: number;
}

// Cache timeouts based, adjust duration in env file or directly
type TCache = Record<string, BlogReturn>;
const TTL = import.meta.env.VITE_CACHE_TTL || 5;
const timeouts: Record<string, ReturnType<typeof setTimeout>> = {};
const cache: TCache = new Proxy(
  {},
  {
    get(target: TCache, prop: string) {
      if (!(prop in target)) return undefined;
      clearTimeout(timeouts[prop]);
      timeouts[prop] = setTimeout(() => {
        delete timeouts[prop];
        delete target[prop];
      }, TTL * 1000 * 60);
      return target[prop];
    },
    set(target: TCache, key: string, val: BlogReturn) {
      clearTimeout(timeouts[key]);
      timeouts[key] = setTimeout(() => {
        delete timeouts[key];
        delete target[key];
      }, TTL * 1000 * 60);
      target[key] = val;
      return true;
    },
  }
);

export const fetchBlogs = createAsyncThunk<
  BlogReturn,
  FetchBlogArgs,
  { rejectValue: string }
>("fetch/blogs", async (args, { signal, rejectWithValue }) => {
  try {
    const fullQueries: string = new URLSearchParams(
      Object.entries(args)
        .filter(([_, v]) => v !== null && v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString();

    // Cache Hit Check ...
    if (fullQueries in cache) return cache[fullQueries];
    const fullURL: string = `${import.meta.env.VITE_API_URL}/api/blogs${
      fullQueries ? "?" + fullQueries : ""
    }`;
    const options: RequestInit = {
      method: "get",
      signal,
    };
    const response = await fetch(fullURL, options);
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    const resonse_data = await response.json();
    let {
      blogs,
      first_blog,
      page,
      page_size: limit,
      total_blogs,
      total_pages,
    } = resonse_data;
    blogs = blogs.filter(
      (blog: BlogReturn["blogs"]) => blogsSchema.safeParse(blog).success
    );
    // TODO: sort queries before assigning to filter on, duplicates
    const data = {
      blogs,
      first_blog,
      page,
      page_size: limit,
      total_blogs,
      total_pages,
    };
    cache[fullQueries] = data;

    return data as BlogReturn;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("network");
    }
    if (err instanceof Error) {
      // Map status codes to error message for scalabality (and multi lang support)
      return rejectWithValue(err.message as string);
    }
    return rejectWithValue("unknown");
  }
});

interface BlogState {
  loading: boolean;
  error: string | null;
  data: BlogReturn | null;
  shouldRedirect: boolean;
}

const initialState: BlogState = {
  loading: false,
  error: null,
  data: null,
  shouldRedirect: false,
};

export const blogSlice = createSlice({
  name: "blog/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.shouldRedirect = false;
      // avoid resetting blogs on failure, to deliver stale data
    });
    builder.addCase(
      fetchBlogs.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown";
        state.shouldRedirect = action.payload === "400";
      }
    );
    builder.addCase(
      fetchBlogs.fulfilled,
      (state, action: PayloadAction<BlogReturn>) => {
        state.error = null;
        state.loading = false;
        state.data = action.payload;
      }
    );
  },
});

export default blogSlice.reducer;

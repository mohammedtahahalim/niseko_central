import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";

type FetchBlogArgs = Record<string, string | number>;

interface BlogSnippet {
  title: string;
  image: string;
  date: string;
}

const blogSchema = z.object({
  title: z.string().nonempty(),
  image: z.string().nonempty(),
  date: z.string().nonempty(),
});

export const fetchBlogs = createAsyncThunk<
  BlogSnippet[],
  FetchBlogArgs,
  { rejectValue: string }
>("fetch/blogs", async (args, { signal, rejectWithValue }) => {
  try {
    const fullQueries: string = new URLSearchParams(
      Object.entries(args)
        .filter(([_, v]) => v !== null && v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString();
    const fullURL: string = `${import.meta.env.VITE_API_URL}/api/latestblogs${
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
    const resonseData = await response.json();
    const rawData = resonseData.blogs;
    const data = rawData.filter(
      (blog: BlogSnippet) => blogSchema.safeParse(blog).success
    );

    return data as BlogSnippet[];
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("Network Error");
    }
    if (err instanceof Error) {
      return rejectWithValue(err.message as string);
    }
    return rejectWithValue("Unknown");
  }
});

interface BlogState {
  blogLoading: boolean;
  error: string | null;
  blogs: BlogSnippet[];
}

const initialState: BlogState = {
  blogLoading: false,
  error: null,
  blogs: [],
};

export const blogSlice = createSlice({
  name: "blog/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      state.blogLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchBlogs.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.blogLoading = false;
        state.error = action.payload ?? "Unknown";
      }
    );
    builder.addCase(
      fetchBlogs.fulfilled,
      (state, action: PayloadAction<BlogSnippet[]>) => {
        state.error = null;
        state.blogLoading = false;
        state.blogs = action.payload;
      }
    );
  },
});

export default blogSlice.reducer;

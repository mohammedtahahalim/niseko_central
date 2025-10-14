import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface FetchSuggestionsProps {
  queries?: Record<string, string | number>;
}

interface SuggestionsBookingsReturn {}

export const fetchSuggestions = createAsyncThunk<
  SuggestionsBookingsReturn[],
  FetchSuggestionsProps,
  { rejectValue: string }
>("suggestions/thunk", async (args, { rejectWithValue, signal }) => {
  const { queries = {} } = args;
  const fullQueries: string = new URLSearchParams(
    Object.entries(queries)
      .filter(([_, v]) => v !== undefined && v !== null)
      .map(([k, v]) => [k, String(v)])
  ).toString();
  const fullURL: string = `${import.meta.env.VITE_API_URL}?${fullQueries}`;
  const fullOptions: RequestInit = {
    method: "get",
    signal,
    credentials: "include", // if credentials exists, backend should respond with targeted recommendation
  };
  try {
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    const data = await response.json();
    return data.bookings as SuggestionsBookingsReturn[];
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("network");
    }
    if (err instanceof Error) {
      return rejectWithValue(err.message as string);
    }
    return rejectWithValue("unknown");
  }
});

interface FetchSuggestionState {
  loading: boolean;
  error: string;
  bookings: FetchSuggestionsProps[];
}

const initialState: FetchSuggestionState = {
  loading: false,
  error: "",
  bookings: [],
};

export const suggestionSlice = createSlice({
  name: "suggestions/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSuggestions.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchSuggestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "unknown";
    });
    builder.addCase(
      fetchSuggestions.fulfilled,
      (state, action: PayloadAction<SuggestionsBookingsReturn[]>) => {
        state.loading = false;
        state.error = "";
        state.bookings = action.payload;
      }
    );
  },
});

export default suggestionSlice.reducer;

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { z } from "zod";

interface FetchSuggestionsProps {
  queries?: Record<string, string | number>;
}

const suggestionsBookingSchema = z.object({
  id: z.number().nonnegative(),
  image: z.string(),
  blurred_image: z.string(),
  max_pax: z.number(),
  lifts_distance: z.number(),
  tag: z.number(),
  ar: z.object({
    type: z.string(),
    title: z.string(),
  }),
  fr: z.object({ type: z.string(), title: z.string() }),
  en: z.object({ type: z.string(), title: z.string() }),
  ja: z.object({ type: z.string(), title: z.string() }),
});

export type SuggestionBookingData = z.infer<typeof suggestionsBookingSchema>;

export const fetchSuggestions = createAsyncThunk<
  SuggestionBookingData[],
  FetchSuggestionsProps,
  { rejectValue: string }
>("suggestions/thunk", async (args, { rejectWithValue, signal }) => {
  const { queries = {} } = args;
  const fullQueries: string = new URLSearchParams(
    Object.entries(queries)
      .filter(([_, v]) => v !== undefined && v !== null)
      .map(([k, v]) => [k, String(v)])
  ).toString();
  const fullURL: string = `${
    import.meta.env.VITE_API_URL
  }/api/property?${fullQueries}`;
  const fullOptions: RequestInit = {
    method: "get",
    signal,
  };
  try {
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    const rawData = await response.json();
    const data = rawData.properties.filter(
      (property: SuggestionBookingData) =>
        suggestionsBookingSchema.safeParse(property).success
    );
    return data as SuggestionBookingData[];
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
  suggestionsLoading: boolean;
  error: string;
  suggestionsBookings: SuggestionBookingData[];
}

const initialState: FetchSuggestionState = {
  suggestionsLoading: false,
  error: "",
  suggestionsBookings: [],
};

export const suggestionSlice = createSlice({
  name: "suggestions/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSuggestions.pending, (state) => {
      state.suggestionsLoading = true;
      state.error = "";
    });
    builder.addCase(fetchSuggestions.rejected, (state, action) => {
      state.suggestionsLoading = false;
      state.error = action.payload ?? "unknown";
    });
    builder.addCase(
      fetchSuggestions.fulfilled,
      (state, action: PayloadAction<SuggestionBookingData[]>) => {
        state.suggestionsLoading = false;
        state.error = "";
        state.suggestionsBookings = action.payload;
      }
    );
  },
});

export default suggestionSlice.reducer;

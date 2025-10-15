import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { possibleLanguages } from "../../utils/Constants";
import { z } from "zod";

interface FetchSuggestionsProps {
  queries?: Record<string, string | number>;
}

export interface SuggestionBookingData {
  booking_main_image: string;
  booking_title: string;
  booking_location: string;
  distance: number;
  max_capacity: number;
  tag?: {
    tag_title: string;
    tag_subtitle: string;
    tag_color: string;
  };
}

type SuggestionsBookingsReturn = Record<
  keyof typeof possibleLanguages,
  SuggestionBookingData
>;

const suggestionsBookingSchema = z.object({
  booking_main_image: z.string(),
  booking_title: z.string(),
  booking_location: z.string(),
  distance: z.number(),
  max_capacity: z.number(),
  tag: z.optional(
    z.object({
      tag_title: z.string(),
      tag_subtitle: z.string(),
      tag_color: z.string(),
    })
  ),
});

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
  const fullURL: string = `${
    import.meta.env.VITE_API_URL
  }/api/suggestions?${fullQueries}`;
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
    const rawData = await response.json();
    const data = rawData.bookings;
    for (let booking of data) {
      for (let lang of Object.keys(booking)) {
        if (!possibleLanguages.includes(lang)) throw new Error("bad_format");
        const isValidBooking = suggestionsBookingSchema.safeParse(
          booking[lang]
        );
        if (!isValidBooking.success) throw new Error("bad_format");
      }
    }
    return data as SuggestionsBookingsReturn[];
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
  bookings: SuggestionsBookingsReturn[];
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

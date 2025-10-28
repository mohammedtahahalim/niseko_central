import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { FilterValue, SortingType } from "../../utils/Types";
import z from "zod";

const propertySchema = z.object({
  en: z.object({}),
  ja: z.object({}),
  ar: z.object({}),
  fr: z.object({}),
  max_pax: z.number().nonnegative(),
  beds: z.number().nonnegative(),
  size: z.number().nonnegative(),
  village_distance: z.number().nonnegative(),
  lifts_distance: z.number().nonnegative(),
  tag: z.string(),
  typeId: z.number().nonnegative(),
  propertyId: z.number().nonnegative(),
  images: z.array(z.object({ url: z.string(), alt: z.string() })),
  map: z.string(),
  price_per_night: z.number().nonnegative(),
  discount: z.number(),
});

export type Property = z.infer<typeof propertySchema>;

interface BookingState<T extends Object> {
  loading: boolean;
  error: string;
  bookings: T[];
  displayBookings: T[];
  filters: {
    type: number;
    max_pax: number;
    property: number;
  };
  sort_order: boolean;
  previous_sort: SortingType | null;
}

export const fetchBookings = createAsyncThunk<
  Property[],
  void,
  { rejectValue: string }
>("fetch/bookings", async (_, { rejectWithValue }) => {
  try {
    return [];
  } catch (err) {
    return rejectWithValue("Error");
  }
});

const initialState: BookingState<Property> = {
  loading: false,
  error: "",
  bookings: [],
  displayBookings: [],
  filters: {
    type: 0,
    max_pax: 0,
    property: 0,
  },
  sort_order: true,
  previous_sort: null,
};

export const bookingSlice = createSlice({
  name: "booking/slice",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterValue>) => {
      const { filter, value } = action.payload;
      if (filter === "max_pax") {
        state.filters.max_pax = value;
      } else if (filter === "type") {
        state.filters.type = value;
      } else if (filter === "property") {
        state.filters.property = value;
      }
    },
    sortBookings: (state, action: PayloadAction<SortingType>) => {
      if (state.previous_sort === action.payload) {
        state.sort_order = !state.sort_order;
      } else {
        state.previous_sort = action.payload;
        state.sort_order = true;
      }
      switch (action.payload) {
        case "price":
          break;
        case "name":
          break;
        case "size":
          break;
        case "bedrooms":
          break;
        case "discount":
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBookings.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      fetchBookings.rejected,
      (state, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
    builder.addCase(
      fetchBookings.fulfilled,
      (state, action: PayloadAction<Property[]>) => {
        state.loading = false;
        state.bookings = action.payload;
        state.displayBookings = action.payload;
      }
    );
  },
});

export default bookingSlice.reducer;
export const { setFilter, sortBookings } = bookingSlice.actions;

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { FilterValue, SortingType } from "../../utils/Types";
import z from "zod";

const bookingsScehma = z.object({
  id: z.number(),
  images: z.array(z.string().nonempty()),
  blurred_images: z.array(z.string().nonempty()),
  max_pax: z.number().nonnegative(),
  lifts_distance: z.number(),
  price: z.number(),
  size: z.number(),
  beds: z.number(),
  translations: z.object({
    en: z.object({
      type: z.string(),
      title: z.string(),
    }),
    ja: z.object({
      type: z.string(),
      title: z.string(),
    }),
    fr: z.object({
      type: z.string(),
      title: z.string(),
    }),
    ar: z.object({
      type: z.string(),
      title: z.string(),
    }),
  }),
});

export type Property = z.infer<typeof bookingsScehma>;

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
  Record<string, string | number>,
  { rejectValue: string }
>("fetch/bookings", async (args, { rejectWithValue }) => {
  try {
    const fullQueries = new URLSearchParams(
      Object.entries(args)
        .filter(([_, v]) => v !== null && v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString();
    const fullURL = `${import.meta.env.VITE_API_URL}/api/bookings${
      fullQueries ? "?" + fullQueries : ""
    }`;
    const response = await fetch(fullURL);
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    const raw_data = await response.json();
    const data = raw_data.properties.map((property: any) => {
      return {
        ...property,
        images: JSON.parse(property.images),
        blurred_images: JSON.parse(property.blurred_images),
      };
    });
    console.log(data);
    return data.filter(
      (property: Property) => bookingsScehma.safeParse(property).success
    ) as Property[];
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("network");
    }
    if (err instanceof Error) {
      return rejectWithValue(err.message ?? "unknown");
    }
    return rejectWithValue("unknown");
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
          state.displayBookings = state.displayBookings.sort(
            (a: Property, b: Property) => {
              if (state.sort_order) {
                return a.price - b.price;
              } else {
                return b.price - a.price;
              }
            }
          );
          break;
        case "name":
          state.displayBookings = state.displayBookings.sort(
            (a: Property, b: Property) => {
              if (state.sort_order) {
                return a.translations.en.title.localeCompare(
                  b.translations.en.title
                );
              } else {
                return b.translations.en.title.localeCompare(
                  a.translations.en.title
                );
              }
            }
          );
          break;
        case "size":
          state.displayBookings = state.displayBookings.sort(
            (a: Property, b: Property) => {
              if (state.sort_order) {
                return a.size - b.size;
              } else {
                return b.size - a.size;
              }
            }
          );
          break;
        case "bedrooms":
          state.displayBookings = state.displayBookings.sort(
            (a: Property, b: Property) => {
              if (state.sort_order) {
                return a.beds - b.beds;
              } else {
                return b.beds - a.beds;
              }
            }
          );
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

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { FilterValue, SortingType } from "../../utils/Types";
import z from "zod";
import type Property from "../../pages/item_pages/Property";
import { properties_types } from "../../utils/Constants";

const bookingsScehma = z.object({
  id: z.number(),
  image: z.string().nonempty(),
  blurred_image: z.string().nonempty(),
  max_pax: z.number().nonnegative(),
  lifts_distance: z.number(),
  price: z.number(),
  beds: z.number(),
  size: z.number(),
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
});

export type Property = z.infer<typeof bookingsScehma>;

const DEFAULT_KEY = "default";
const timeouts: Record<string, ReturnType<typeof setTimeout>> = {};

const bookingCache = new Proxy(
  {},
  {
    get(obj: Record<string, Property[]>, key: string) {
      const modKey = key || DEFAULT_KEY;
      return obj[modKey];
    },
    set(obj: Record<string, Property[]>, key: string, value: Property[]) {
      const modKey = key || DEFAULT_KEY;
      obj[modKey] = value;
      if (timeouts[modKey]) clearTimeout(timeouts[modKey]);
      timeouts[modKey] = setTimeout(
        () => {
          delete obj[modKey];
          delete timeouts[modKey];
        },
        import.meta.env.VITE_CACHE_TTL * 60 * 1000,
      );
      return true;
    },
    has(obj: Record<string, Property[]>, key: string) {
      const modKey = key || DEFAULT_KEY;
      return Object.prototype.hasOwnProperty.call(obj, modKey);
    },
  },
);

interface BookingState<T extends object> {
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
  shouldRedirect: boolean;
}

export const fetchBookings = createAsyncThunk<
  Property[],
  Record<string, string | number>,
  { rejectValue: string }
>("fetch/bookings", async (args, { rejectWithValue, signal }) => {
  try {
    const fullQueries = new URLSearchParams(
      Object.entries(args)
        .filter(([_, v]) => v !== null && v !== undefined)
        .map(([k, v]) => [k, String(v)]),
    ).toString();
    if (bookingCache[fullQueries]) {
      return bookingCache[fullQueries] as Property[];
    }
    const fullURL = `${import.meta.env.VITE_API_URL}/api/property${
      fullQueries ? "?" + fullQueries : ""
    }`;
    const response = await fetch(fullURL, { signal });
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    const raw_data = await response.json();
    const filtered_data = raw_data.properties.filter(
      (property: Property) => bookingsScehma.safeParse(property).success,
    );
    bookingCache[fullQueries] = filtered_data;
    return filtered_data as Property[];
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
  shouldRedirect: false,
};

export const bookingSlice = createSlice({
  name: "booking/slice",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterValue>) => {
      const { filter, value } = action.payload;
      if (filter === "max_pax") {
        state.filters.max_pax = value;
        state.displayBookings = state.bookings
          .filter((booking) => booking.max_pax >= value)
          .filter((booking) =>
            booking.en.title.includes(
              properties_types.get(state.filters.property)!,
            ),
          );
      } else if (filter === "type") {
        state.filters.type = value;
      } else if (filter === "property") {
        state.filters.property = value;
        state.displayBookings = state.bookings
          .filter((booking) => booking.max_pax >= state.filters.max_pax)
          .filter((booking) =>
            booking.en.title.includes(properties_types.get(value)!),
          );
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
            },
          );
          break;
        case "name":
          state.displayBookings = state.displayBookings.sort(
            (a: Property, b: Property) => {
              if (state.sort_order) {
                return a.en.title.localeCompare(b.en.title);
              } else {
                return b.en.title.localeCompare(a.en.title);
              }
            },
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
            },
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
            },
          );
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBookings.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.shouldRedirect = false;
    });
    builder.addCase(
      fetchBookings.rejected,
      (state, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
        state.shouldRedirect = action.payload === "400";
      },
    );
    builder.addCase(
      fetchBookings.fulfilled,
      (state, action: PayloadAction<Property[]>) => {
        state.loading = false;
        state.bookings = action.payload;
        state.displayBookings = action.payload;
      },
    );
  },
});

export default bookingSlice.reducer;
export const { setFilter, sortBookings } = bookingSlice.actions;

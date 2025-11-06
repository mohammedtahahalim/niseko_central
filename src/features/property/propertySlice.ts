import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";

interface FetchPropertyArgs {
  id: string | undefined;
  title: string | undefined;
}

const propertySchema = z.object({});

type ProperyType = z.infer<typeof propertySchema>;

export const fetchProperty = createAsyncThunk<
  ProperyType,
  FetchPropertyArgs,
  { rejectValue: string }
>("fetch/property", async (args, { signal, rejectWithValue }) => {
  const { id, title } = args;
  const fullURL: string = `${
    import.meta.env.VITE_API_URL
  }/api/property?id=${id}&title=${title}`;
  const fullOptions: RequestInit = {
    method: "GET",
    signal,
  };
  try {
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    const data = await response.json();
    const isValid = propertySchema.safeParse(data);
    if (!isValid.success) {
      throw new Error(
        isValid.error.issues.map((issue) => issue.message).join(", ")
      );
    }
    return data as ProperyType;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("Network Error");
    }
    if (err instanceof Error) {
      return rejectWithValue((err.message as string) || "Unknown Error");
    }
    return rejectWithValue("Unknown Error");
  }
});

interface PropertySliceState {
  loading: boolean;
  error: string | null;
  shouldRedirect: boolean;
  propertyData: any;
}

const initialState: PropertySliceState = {
  loading: false,
  error: null,
  shouldRedirect: false,
  propertyData: null,
};

export const propertySlice = createSlice({
  name: "property/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProperty.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchProperty.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload ?? "Unknown Error";
        state.loading = false;
        state.shouldRedirect = false;
      }
    );
    builder.addCase(
      fetchProperty.fulfilled,
      (state, action: PayloadAction<ProperyType>) => {
        state.loading = false;
        state.propertyData = action.payload;
        state.shouldRedirect = false;
      }
    );
  },
});

export default propertySlice.reducer;

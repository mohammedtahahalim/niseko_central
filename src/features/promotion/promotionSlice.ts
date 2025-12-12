import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";

const promotionSchema = z.object({
  id: z.number().nonnegative(),
  image: z.string().nonempty(),
  blur_image: z.string().nonempty(),
  en: z.object({
    title: z.string().nonempty(),
    content: z.string().nonempty(),
  }),
  ja: z.object({
    title: z.string().nonempty(),
    content: z.string().nonempty(),
  }),
  ar: z.object({
    title: z.string().nonempty(),
    content: z.string().nonempty(),
  }),
  fr: z.object({
    title: z.string().nonempty(),
    content: z.string().nonempty(),
  }),
});

type PromotionArgs = {
  queries: Record<string, string | number>;
  options?: RequestInit;
};

type Promotion = z.infer<typeof promotionSchema>;

export const fetchPromotion = createAsyncThunk<
  Promotion,
  PromotionArgs | void,
  { rejectValue: string }
>("promotion/thunk", async (_args, { signal, rejectWithValue }) => {
  try {
    const { queries, options } = _args ?? {};
    const fullQueries: string = new URLSearchParams(
      Object.entries(queries ?? {})
        .filter(([_, v]) => v !== undefined && v !== null)
        .map(([k, v]) => [k, String(v)])
    ).toString();
    const fullOptions: RequestInit = {
      signal,
      ...options,
    };
    const fullURL: string = `${import.meta.env.VITE_API_URL}/api/promotion${
      fullQueries ? "?" + fullQueries : ""
    }`;
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    const raw_data = await response.json();
    const isValidData = promotionSchema.safeParse(raw_data.promotion);
    if (!isValidData.success) {
      throw new Error(
        isValidData.error.issues.map((i) => i.message).join("\n")
      );
    }
    return raw_data.promotion as Promotion;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("Network Error");
    }
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Unknown Error");
  }
});

type PromotionData = {
  loading: boolean;
  error: string | null;
  promotion: Promotion;
  shouldRedirect: boolean;
};

const initialState: PromotionData = {
  loading: false,
  error: null,
  promotion: {
    id: 0,
    image: "",
    blur_image: "",
    en: { title: "", content: "" },
    ja: { title: "", content: "" },
    ar: { title: "", content: "" },
    fr: { title: "", content: "" },
  },
  shouldRedirect: false,
};

const promotionSlice = createSlice({
  name: "promotion/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchPromotion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.shouldRedirect = false;
      })
      .addCase(
        fetchPromotion.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Unknown Error";
          state.shouldRedirect = action.payload === "400";
        }
      )
      .addCase(
        fetchPromotion.fulfilled,
        (state, action: PayloadAction<Promotion>) => {
          state.loading = false;
          state.error = null;
          state.promotion = action.payload;
        }
      ),
});

export default promotionSlice.reducer;

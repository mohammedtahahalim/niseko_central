// TODO: Implement the inquiry.js backend endpoint

// TODO: convert the number array of properties to set using useMemo (to make properties checkup constant for more performance)

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { RootState } from "../../app/store";

const accommodationSchema = z.object({
  first_name: z.string().regex(/^[\p{L} ]+$/u, {
    message: "First Name cannot be empty or contain illegal characters",
  }),
  last_name: z.string().regex(/^[\p{L} ]+$/u, {
    message: "Last Name cannot be empty or contain illegal characters",
  }),
  email: z.email({ message: "Please Insert a valid email" }),
  country: z.string().nonempty({ message: "Please Insert a valid country" }),
  phone: z.string().nonempty({ message: "Please Insert a valid phone" }),
  date: z.string().regex(/^\d{2}(\/|-)\d{2}(\1)\d{4}$/, {
    message: "Please Insert a valid date : MM/DD/YYYY",
  }),
  flexibility: z.boolean(),
  nights: z
    .number()
    .positive({ message: "Number of night must be bigger than 0" }),
  adults: z
    .number()
    .positive({ message: "Number of guests must be bigger than 0" }),
  children: z.number().or(z.null()),
  infants: z.number().or(z.null()),
  properties: z.array(z.number().positive()),
  comments: z.string(),
});

const generalSchema = z.discriminatedUnion("in_house", [
  z.object({
    in_house: z.literal(false),
    first_name: z
      .string()
      .regex(/^[\p{L} ]+$/u)
      .nonempty(),
    last_name: z
      .string()
      .regex(/^[\p{L} ]+$/u)
      .nonempty(),
    email: z.email().nonempty(),
    message: z.string().nonempty(),
  }),
  z.object({
    in_house: z.literal(true),
    first_name: z
      .string()
      .regex(/^[\p{L} ]+$/u)
      .nonempty(),
    last_name: z
      .string()
      .regex(/^[\p{L} ]+$/u)
      .nonempty(),
    phone: z.string().nonempty(),
    emergency_phone: z.string().nonempty(),
  }),
]);

type AccommodationInquiry = z.infer<typeof accommodationSchema>;

type GeneralInquiry = z.infer<typeof generalSchema>;

interface InquiryState {
  loading: boolean;
  error: string | null;
  isSubmitted: boolean;
  formData: {
    type: "accommodation" | "general";
    accommodation_data: AccommodationInquiry;
    general_data: GeneralInquiry;
  };
}

const initialGeneralState: GeneralInquiry = {
  first_name: "",
  last_name: "",
  in_house: false,
  email: "",
  message: "",
};

const initialAccommodationState: AccommodationInquiry = {
  first_name: "",
  last_name: "",
  email: "",
  country: "",
  phone: "",
  date: "",
  flexibility: true,
  nights: 1,
  adults: 1,
  children: 0,
  infants: 0,
  properties: [],
  comments: "",
};

const initialState: InquiryState = {
  loading: false,
  error: null,
  isSubmitted: false,
  formData: {
    type: "accommodation",
    accommodation_data: initialAccommodationState,
    general_data: initialGeneralState,
  },
};

export const submitInquiry = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("inquiry", async (_, { signal, rejectWithValue, getState }) => {
  const { formData } = (getState() as RootState).contact;
  try {
    const isValidForm =
      formData.type === "accommodation"
        ? accommodationSchema.safeParse(formData.accommodation_data)
        : generalSchema.safeParse(formData.general_data);
    if (!isValidForm.success) {
      throw new Error(
        isValidForm.error.issues.map((issue) => issue.message).join(", ")
      );
    }
    const fullURL: string = `${import.meta.env.VITE_API_URL}/api/inquiry`;
    const fullOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: formData.type,
        data:
          formData.type === "accommodation"
            ? formData.accommodation_data
            : formData.general_data,
      }),
      signal,
    };
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    const { success, rejection_error } = await response.json();
    if (!success) {
      throw new Error(rejection_error);
    }
    alert("Message Submitted Successfully ...");
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("network");
    }
    if (err instanceof Error) {
      alert(
        err.message
          .split(", ")
          .map((elem) => "- " + elem)
          .join("\n")
      );
      return rejectWithValue(err.message);
    }
    return rejectWithValue("unknown");
  }
});

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    switch_type(state, action: { payload: "general" | "accommodation" }) {
      state.formData.type = action.payload;
    },
    update_field(
      state,
      action: PayloadAction<{
        key: string;
        value: any;
      }>
    ) {
      const { key, value } = action.payload;
      const active_type =
        state.formData.type === "accommodation"
          ? "accommodation_data"
          : "general_data";
      if (!(key in state.formData[active_type])) return;
      (state.formData[active_type] as Record<string, any>)[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        submitInquiry.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "unknown";
          state.isSubmitted = false;
        }
      )
      .addCase(submitInquiry.fulfilled, (state) => {
        state.loading = false;
        state.isSubmitted = true;
      });
  },
});

export default contactSlice.reducer;
export const { switch_type, update_field } = contactSlice.actions;

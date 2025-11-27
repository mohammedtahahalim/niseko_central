// TODO: reducers for both accomodation and general state, have the redux slice copies the ref of either accommodation or general
// and to preserve state when switching between types

// TODO: Implement the core logic for submitting an inquiry

// TODO: Implement the inquiry.js backend endpoint

// TODO: Serialize the properties set before submitting, to validate redux strict middleware checks

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import z from "zod";

export const submitInquiry = createAsyncThunk("inquiry", async () => {});

const accommodationSchema = z.object({
  first_name: z
    .string()
    .regex(/^[\p{L} ]+$/u)
    .nonempty(),
  last_name: z
    .string()
    .regex(/^[\p{L} ]+$/u)
    .nonempty(),
  email: z.email().nonempty(),
  country: z.string().nonempty(),
  phone: z.string().nonempty(),
  date: z.string().regex(/^\d{2}-\d{2}-\d{4}$/),
  flexibility: z.boolean(),
  nights: z.number().positive(),
  adults: z.number().positive(),
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

interface AccommodationInquiry {
  type: "accommodation";
  inquiry: z.infer<typeof accommodationSchema>;
}

interface GeneralInquiry {
  type: "general";
  inquiry: z.infer<typeof generalSchema>;
}

interface InquiryState {
  loading: boolean;
  error: string | null;
  formData: AccommodationInquiry | GeneralInquiry;
}

const initialGeneralState: GeneralInquiry = {
  type: "general",
  inquiry: {
    first_name: "",
    last_name: "",
    in_house: false,
    email: "",
    message: "",
  },
};

const initialAccommodationState: AccommodationInquiry = {
  type: "accommodation",
  inquiry: {
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    phone: "",
    date: "",
    flexibility: true,
    nights: 1,
    adults: 0,
    children: 0,
    infants: 0,
    properties: [],
    comments: "",
  },
};

const initialState: InquiryState = {
  loading: false,
  error: null,
  formData: initialAccommodationState,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    switch_type(state, action: { payload: "general" | "accommodation" }) {
      if (action.payload === "general") {
        state.formData = initialGeneralState;
      } else {
        state.formData = initialAccommodationState;
      }
    },
  },
});

export default contactSlice.reducer;
export const { switch_type } = contactSlice.actions;

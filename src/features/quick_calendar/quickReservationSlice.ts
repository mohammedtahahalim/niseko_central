import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { convertDate } from "../../utils/Constants";

interface QuickReservationState {
  start_date: string;
  end_date: string;
  adults: number;
  children: number;
  infants: number;
  reservationUrl: string;
}

const initialState: QuickReservationState = {
  start_date: convertDate(new Date(), "en"),
  end_date: convertDate(
    new Date(new Date().setDate(new Date().getDate() + 2)),
    "en"
  ),
  adults: 2,
  children: 0,
  infants: 0,
  reservationUrl: "",
};

const quickReservationSlice = createSlice({
  name: "quick/reservation",
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.start_date = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.end_date = action.payload;
    },
    setAdults: (state, action: PayloadAction<number>) => {
      state.adults = action.payload;
    },
    setChildren: (state, action: PayloadAction<number>) => {
      state.children = action.payload;
    },
    setInfants: (state, action: PayloadAction<number>) => {
      state.infants = action.payload;
    },
    submitReservation: (state) => {
      const queries = new URLSearchParams(
        Object.entries({
          start_date: state.start_date,
          end_date: state.end_date,
          adults: state.adults.toString(),
          children: state.children.toString(),
          infants: state.infants.toString(),
        })
      );
      state.reservationUrl = `/niseko-accomodation?${queries}`;
    },
  },
});

export default quickReservationSlice.reducer;
export const {
  setStartDate,
  setEndDate,
  setAdults,
  setChildren,
  setInfants,
  submitReservation,
} = quickReservationSlice.actions;

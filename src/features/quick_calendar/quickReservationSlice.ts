import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface QuickReservationState {
  start_date: string;
  end_date: string;
  adults: number;
  children: number;
  infants: number;
  reservationUrl: string;
  shouldRedirect: boolean;
}

const initialState: QuickReservationState = {
  start_date: new Date().toISOString().split("T")[0],
  end_date: new Date(new Date().setDate(new Date().getDate() + 2))
    .toISOString()
    .split("T")[0],
  adults: 2,
  children: 0,
  infants: 0,
  reservationUrl: "",
  shouldRedirect: false,
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
      state.adults = Math.max(action.payload, 1);
    },
    setChildren: (state, action: PayloadAction<number>) => {
      state.children = Math.max(action.payload, 0);
    },
    setInfants: (state, action: PayloadAction<number>) => {
      state.infants = Math.max(action.payload, 0);
    },
    submitReservation: (state) => {
      const queries = new URLSearchParams(
        Object.entries({
          start_date: state.start_date,
          end_date: state.end_date,
          adults: state.adults.toString(),
          children: state.children.toString(),
          infants: state.infants.toString(),
        }),
      );
      state.reservationUrl = `/niseko-accommodation?${queries}`;
      state.shouldRedirect = true;
    },
    resetSubmission: (state) => {
      state.shouldRedirect = false;
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
  resetSubmission,
} = quickReservationSlice.actions;

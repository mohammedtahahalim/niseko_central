import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface QuickReservationState {
  start_date: Date;
  end_date: Date;
  adults: number;
  children: number;
  infants: number;
  reservationUrl: string;
}

const initialState: QuickReservationState = {
  start_date: new Date(),
  end_date: new Date(new Date().setDate(new Date().getDate() + 2)),
  adults: 2,
  children: 0,
  infants: 0,
  reservationUrl: "",
};

const quickReservationSlice = createSlice({
  name: "quick/reservation",
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<Date>) => {
      state.start_date = action.payload;
    },
    setEndDate: (state, action: PayloadAction<Date>) => {
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
          start_date: state.start_date.toISOString(),
          end_date: state.end_date.toISOString(),
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

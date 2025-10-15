import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./slices/testSlice";
import authSlice from "../features/auth/authSlice";
import newsLetterSlice from "../features/newsletter/newsLetterSlice";
import quickReservationSlice from "../features/quick_calendar/quickReservationSlice";
import suggestionSlice from "../features/suggestions/suggestionsSlice";

export const NisekoStore = configureStore({
  reducer: {
    test: testSlice,
    auth: authSlice,
    newsLetter: newsLetterSlice,
    quickReservation: quickReservationSlice,
    suggestions: suggestionSlice,
  },
});

export type AppDispatch = typeof NisekoStore.dispatch;
export type RootState = ReturnType<typeof NisekoStore.getState>;

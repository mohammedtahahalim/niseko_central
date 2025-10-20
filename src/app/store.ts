import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "../features/home/news/newsSlice";
import authSlice from "../features/auth/authSlice";
import newsLetterSlice from "../features/newsletter/newsLetterSlice";
import quickReservationSlice from "../features/quick_calendar/quickReservationSlice";
import suggestionSlice from "../features/home/suggestions/suggestionsSlice";

export const NisekoStore = configureStore({
  reducer: {
    auth: authSlice,
    newsLetter: newsLetterSlice,
    quickReservation: quickReservationSlice,
    suggestions: suggestionSlice,
    latestNews: newsSlice,
  },
});

export type AppDispatch = typeof NisekoStore.dispatch;
export type RootState = ReturnType<typeof NisekoStore.getState>;

import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "../features/home/news/newsSlice";
import authSlice from "../features/auth/authSlice";
import newsLetterSlice from "../features/newsletter/newsLetterSlice";
import quickReservationSlice from "../features/quick_calendar/quickReservationSlice";
import suggestionSlice from "../features/suggestions/suggestionsSlice";
import blogSlice from "../features/home/blog/blogSlice";
import bookingSlice from "../features/accomodation/bookingsSlice";
import propertySlice from "../features/property/propertySlice";
import conciergeSlice from "../features/concierge/conciergeSlice";
import contactSlice from "../features/contact/contactSlice";
import promotionSlice from "../features/promotion/promotionSlice";

export const NisekoStore = configureStore({
  reducer: {
    auth: authSlice,
    newsLetter: newsLetterSlice,
    quickReservation: quickReservationSlice,
    suggestions: suggestionSlice,
    news: newsSlice,
    blogs: blogSlice,
    bookings: bookingSlice,
    property: propertySlice,
    concierge: conciergeSlice,
    contact: contactSlice,
    promotion: promotionSlice,
  },
});

export type AppDispatch = typeof NisekoStore.dispatch;
export type RootState = ReturnType<typeof NisekoStore.getState>;

import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from "../features/tickets/ticketsSlice";
import filtersReducer from "../features/tickets/filtersSlice"

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    filters: filtersReducer
  }
});

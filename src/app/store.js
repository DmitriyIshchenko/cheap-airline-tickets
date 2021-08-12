import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from "../features/tickets/ticketsSlice"

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer
  }
});

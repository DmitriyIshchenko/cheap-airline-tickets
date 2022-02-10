import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTickets } from "./ticketsAPI";

const initialState = {
  items: [],
  sortedBy: "duration",
  stopsFilter: {
    0: true,
    1: true,
    2: true,
    3: true
  },
  status: "idle",
  error: null
}

export const fetchTicketsAsync = createAsyncThunk("tickets/fetchTickets", async () => {
  const response = await fetchTickets();
  return response;
})

const getTotalDuration = (ticket) => {
  return ticket.segments.reduce((total, segment) => total + segment.duration, 0);
}

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortedBy = action.payload;
    },
    setStopsFilter: (state, action) => {
      state.stopsFilter = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTicketsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTicketsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.concat(action.payload);
      })
      .addCase(fetchTicketsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
})

export const selectFilteredItems = (state) => {
  let filteredItems = [...state.items];
  const stopsFilter = Object.keys(state.stopsFilter).filter(key => state.stopsFilter[key]).map(item => +item);
  if (filteredItems.length) {
    filteredItems = filteredItems.filter(item => {
      return stopsFilter.includes(item.segments[0].stops.length) && stopsFilter.includes(item.segments[1].stops.length)
    });

    filteredItems.sort((a, b) => {
      if (state.sortedBy === "price") {
        return a.price - b.price;
      } else return getTotalDuration(a) - getTotalDuration(b);
    });
  }

  return filteredItems;
}

export const { setSortBy, setStopsFilter, filterTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
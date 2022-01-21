import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTicketsAsync } from "./ticketsAPI";

const initialState = {
    items: [],
    filteredItems: [],
    sortedBy: "duration",
    stopsFilter: [],
    status: "idle",
    error: null
}

export const fetchTickets = createAsyncThunk("tickets/fetchTickets", async () => {
    const response = await fetchTicketsAsync();
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
        filterTickets: (state) => {
            state.filteredItems = state.items.filter(ticket => {
                return state.stopsFilter.includes(ticket.segments[0].stops.length)
                    &&
                    state.stopsFilter.includes(ticket.segments[1].stops.length)
            })
            if (state.sortedBy === "price") {
                state.filteredItems = state.filteredItems.sort((a, b) => a.price - b.price)
            }
            if (state.sortedBy === "duration") {
                state.filteredItems = state.filteredItems.sort((a, b) => getTotalDuration(a) - getTotalDuration(b))
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTickets.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.concat(action.payload)
                state.filteredItems = [...state.items].sort((a, b) => getTotalDuration(a) - getTotalDuration(b));
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})

export const { setSortBy, setStopsFilter, filterTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
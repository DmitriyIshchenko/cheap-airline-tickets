import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTickets } from './ticketsAPI';
const initialState = {
    status: "idle",
    tickets: [],
    filters: [],
}

export const fetchIdAsync = createAsyncThunk();
export const fetchTicketsAsync = createAsyncThunk(
    "tickets/fetchTickets",
    async () =>{
        const response = await fetchTickets();
        return response;
    }
);
export const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTicketsAsync.fulfilled, (state,action)=>{
            state.status = "succeeded";
            state.tickets = action.payload;
        })
    }
})

export default ticketsSlice.reducer;
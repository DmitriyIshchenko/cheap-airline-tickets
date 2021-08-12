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
        sortByPrice: (state) => {
            state.tickets = state.tickets.sort((a,b)=>(a.price - b.price));
        },
        sortByTime: (state) =>{
            state.tickets = state.tickets.sort((a,b)=>{
                let first = a.segments[0].duration+a.segments[1].duration;
                let second = b.segments[0].duration+b.segments[1].duration;
                if(first>second) return 1;
                if(first<second) return -1;
                return 0;
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTicketsAsync.fulfilled, (state,action)=>{
            state.status = "succeeded";
            state.tickets = action.payload;
        })
    }
})
export const {sortByPrice,sortByTime} = ticketsSlice.actions; 
export default ticketsSlice.reducer;
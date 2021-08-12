import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: "idle",
    searchID: '',
    tickets: [],
    filters: [],
}

export const fetchIdAsync = createAsyncThunk();
export const fetchTicketsAsync = createAsyncThunk(
);
export const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
})

export default ticketsSlice.reducer;
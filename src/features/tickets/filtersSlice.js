import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: {
        0: true,
        1: true,
        2: false,
        3: false
    }
}
export const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        toggleFilter: (state, action) => {
            state.filters[action.payload] = !state.filters[action.payload];
        }
    }
})

export const {toggleFilter} = filtersSlice.actions;

export default filtersSlice.reducer;
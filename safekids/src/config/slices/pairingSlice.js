import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isPaired: false,
    parentId: null,
    childId: null,
}

const pairingSlice = createSlice({
    name: 'pairing',
    initialState,
    reducers: {
        setParentId: (state, action) => {
            state.parentId = action.payload;
        },
        setChildId: (state, action) => {
            state.childId = action.payload;
        },
        setPaired: (state, action) => {
            state.isPaired = action.payload;
        },
    }

})
export const { setParentId, setChildId, setPaired } = pairingSlice.actions;
export { pairingSlice };
export default pairingSlice.reducer;
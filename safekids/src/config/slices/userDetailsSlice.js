import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null,
    userName: null,
}

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        }
    }
})

export const { setUserId, setUserName } = userDetailsSlice.actions;
export { userDetailsSlice };
export default userDetailsSlice.reducer; 

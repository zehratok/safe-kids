import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiurl, apikey} from "services/api";
import axios from "axios";
export const pairingParentAsync = createAsyncThunk('pairing/pairingParentAsync/rejected', async (uid) => {
    const response = await axios.get(`${apiurl}/pairingParent/${uid}.json?auth=${apikey}`);
    console.log(response.data);
    return await response.data;
});
export const pairingChildAsync = createAsyncThunk('pairing/pairingChildAsync/rejected', async (uid) => {
    const response = await axios.get(`${apiurl}/pairingChild/${uid}.json?auth=${apikey}`);
    console.log(response.data);
    return await response.data;
});
export const pairingSlice = createSlice({
    name: 'pairing',
    initialState: {
        isPaired: false,
        isLoading: false,
        error: null,
        parent: [],
        child: [],
    },
    reducers: {
        setParent: (state, action) => {
            state.parentid = action.payload.id;
            state.parentname = action.payload.name;
            state.parentemail = action.payload.email;
            state.parenttoken = action.payload.token;
        },
        setChild: (state, action) => {
            state.childid = action.payload.id;
            state.childname = action.payload.name;
            state.childemail = action.payload.email;
            state.childtoken = action.payload.token;
        },
        setPaired: (state, action) => {
            state.isPaired = action.payload;
        },
    },
    extraReducers: {
        [pairingParentAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [pairingParentAsync.fulfilled]: (state, action) => {
            state.isPaired = action.payload.isPaired;
            state.parentid = action.payload.parentid;
            state.childid = action.payload.childid;
            state.parentname = action.payload.parentname;
            state.childname = action.payload.childname;
            state.parentemail = action.payload.parentemail;
            state.childemail = action.payload.childemail;
            state.parenttoken = action.payload.parenttoken;
            state.childtoken = action.payload.childtoken;
            state.isLoading = false;
        },
        [pairingParentAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
        [pairingChildAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [pairingChildAsync.fulfilled]: (state, action) => {
            state.isPaired = action.payload.isPaired;
            state.parentid = action.payload.parentid;
            state.childid = action.payload.childid;
            state.parentname = action.payload.parentname;
            state.childname = action.payload.childname;
            state.parentemail = action.payload.parentemail;
            state.childemail = action.payload.childemail;
            state.parenttoken = action.payload.parenttoken;
            state.childtoken = action.payload.childtoken;
            state.isLoading = false;
        },
        [pairingChildAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
    },
});
export const selectChild = (state) => state.pairing.child;
export const selectParent = (state) => state.pairing.parent;
export const selectIsPaired = (state) => state.pairing.isPaired;
export const selectIsLoading = (state) => state.pairing.isLoading;
export const selectError = (state) => state.pairing.error;
export const {setParent, setChild, setPaired} = pairingSlice.actions;
export default pairingSlice.reducer;

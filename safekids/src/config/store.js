import {configureStore } from '@reduxjs/toolkit';
import pairingSlice from './slices/pairingSlice';

 const store = configureStore({
    reducer: {
        pairing: pairingSlice,
    },


})

export default store;
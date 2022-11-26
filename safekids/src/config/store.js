import { configureStore } from '@reduxjs/toolkit';
import pairingSlice from './slices/pairingSlice';
import  userDetailsSlice  from './slices/userDetailsSlice';

const store = configureStore({
    reducer: {
        pairing: pairingSlice,
        userDetails: userDetailsSlice,
    },
})

export default store;
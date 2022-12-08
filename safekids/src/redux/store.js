import {configureStore} from "@reduxjs/toolkit";
import pairingReducer from "./pairing/pairingSlice";
export const store = configureStore({
    reducer: {
        pairing : pairingReducer
    }
});


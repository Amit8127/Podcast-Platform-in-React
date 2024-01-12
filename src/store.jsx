import { configureStore } from "@reduxjs/toolkit";

import useReducer  from "./slices/userSlice";

export default configureStore({
    reducer: {
        user: useReducer,
    },
});
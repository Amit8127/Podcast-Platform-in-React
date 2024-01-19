import { configureStore } from "@reduxjs/toolkit";

import useReducer from "./slices/userSlice";
import podcastReducer from "./slices/podcastSlice";

export default configureStore({
    reducer: {
        user: useReducer,
        podcasts: podcastReducer,
    },
});
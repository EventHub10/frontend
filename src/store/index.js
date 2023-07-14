import { configureStore } from "@reduxjs/toolkit";

import actionsReducer from "../reducers/reducers";

const store = configureStore({reducer: actionsReducer});

export default store;
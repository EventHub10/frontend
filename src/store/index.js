import { configureStore } from "@reduxjs/toolkit";

import actionsReducer from "../reducers/counterRedux";

const store = configureStore({reducer: actionsReducer});

export default store;
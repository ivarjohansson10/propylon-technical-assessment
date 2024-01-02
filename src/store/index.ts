import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import legislation from "./legislation.ts";

const reducer = combineReducers({
  legislation,
});

const store = configureStore({
  reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

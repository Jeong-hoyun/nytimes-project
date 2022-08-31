import { configureStore } from "@reduxjs/toolkit";
import { newsSlice, historySlice,setLocalStorageMiddleware } from "./store/store";

export const store = configureStore({
  reducer: {
    news: newsSlice.reducer,
    history: historySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(setLocalStorageMiddleware),
});




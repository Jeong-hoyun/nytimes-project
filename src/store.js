import { configureStore } from "@reduxjs/toolkit";
import { newsSlice, clipSlice, historySlice } from "./store/store.js";
import { setLocalStorageMiddleware } from "./store/store";

export const store = configureStore({
  reducer: {
    news: newsSlice.reducer,
    clippednews: clipSlice.reducer,
    history: historySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(setLocalStorageMiddleware),
});

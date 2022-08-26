import { configureStore } from "@reduxjs/toolkit";
import { usersSlice, clipSlice } from "./store/store.js";

export const store = configureStore({
  reducer: {
    news: usersSlice.reducer,
    clippednews: clipSlice.reducer,
  },
});

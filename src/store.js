import { configureStore } from "@reduxjs/toolkit";
import { newsSlice, historySlice,setLocalStorageMiddleware } from "./store/store";

export const store = configureStore({
  reducer: {
    news: newsSlice.reducer,
    history: historySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false}).concat(setLocalStorageMiddleware),
    // 직렬화 type문제 해결? 아직 모르는 부분 공부필요
});




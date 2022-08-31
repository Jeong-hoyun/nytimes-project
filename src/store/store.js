import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const SEARCH_HISTORY_KEY = "SEARCH_HISTORY";
export const setLocalStorageMiddleware = (store) => (next) => (action) => {
    if (action.type === "newsSlice/fetchNewsbyWords/fulfilled") {
      const storeHistoryList = [...store.getState().history.history];
      storeHistoryList.unshift(action.meta.arg.q);
      const UpdateHistoryList = [...new Set(storeHistoryList)];
      if (UpdateHistoryList.length >= 6) UpdateHistoryList.length = 5;
      try {
        localStorage.setItem(
          SEARCH_HISTORY_KEY,
          JSON.stringify(UpdateHistoryList)
        );
        store.dispatch(historySlice.actions.addHistory(UpdateHistoryList));
      } catch (e) {
        throw new Error("LocalStorage를 사용할 수 없습니다.", e);
      }
    }
    return next(action);
  };

  export const axiosNewsbyWords = createAsyncThunk(
    "newsSlice/axiosNewsbyWords",
    async (querySet) => {
       const query=querySet.query
       const pageNumber=querySet.pageNumber
       const API_KEY=querySet.API_KEY
       let cancel
      try {
        console.log("createAsyncThunk 진입");
        const res=  await axios({ 
        method: 'GET', 
        url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
        params: { q: query, page: pageNumber,'api-key':API_KEY },
        cancelToken: new axios.CancelToken(c => cancel = c)    })          
        return res;
      } catch (error) {
        if (axios.isCancel(error)) return
      }
      return () => cancel()
    }
  );



  export const newsSlice = createSlice({
    name: "news",
    initialState: {
      news: [],
      loading: false,
      error: "",
    },
    reducers: {
        clip: ({ clippednews}, action) => {
          clippednews.push({text:action.payload, id:Date.now()});      
        },
        unclip: ({ clippednews}, action) => {
          clippednews=clippednews.filter((item) => item.id!==action.payload);
        },
      },
    extraReducers: {
      [axiosNewsbyWords.pending]: (state) => {
        state.loading = true;
        state.news = [];
        state.error = "";
      },
      [axiosNewsbyWords.fulfilled]: (state, action) => {
        state.news = action.payload;
        state.loading = false;
        state.error = "";
      },
      [axiosNewsbyWords.rejected]: (state, action) => {
        state.loading = false;
        state.news = [];
        state.error = action.payload;
      },
    },
  });

  
  const initialHistoryList = (() => {
    let initialState = { history: [],clip:[],isClip:false };
    // console.log("history initialState");
    try {
      initialState.history =
        JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) || [];
    } catch (e) {
      // error
      throw new Error("LocalStorage를 사용할 수 없습니다.", e);
    } finally {
      return initialState;
    }
  })();

  export const historySlice = createSlice({
    name: "history",
    initialState: initialHistoryList,
    reducers: {
      addHistory: (state, action) => {
        state.history = action.payload;
      },
      addClip: (state, action) => {
        state.clip = action.payload;
        state.isClip=true
      },
      deleteClip: (state, action) => {
        state.clip = 'none';
        state.isClip=false;
      },
    },
  });
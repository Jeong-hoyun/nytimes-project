import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const SEARCH_HISTORY_KEY = "SEARCH_HISTORY";
export const setLocalStorageMiddleware = (store) => (next) => (action) =>

{
  console.log(action.type)
    if (action.type === "newsSlice/axiosNewsbyWords/fulfilled") {    
     const storeHistoryList = [...store.getState().history.history];  
      storeHistoryList.unshift(action.meta.arg.query);
      const updateHistoryList = [...new Set(storeHistoryList)];
      if (updateHistoryList.length >= 6) updateHistoryList.length = 5;
      try {
        localStorage.setItem(
          SEARCH_HISTORY_KEY,
          JSON.stringify(updateHistoryList)
        );
        store.dispatch(historySlice.actions.addHistory(updateHistoryList));
        store.dispatch(newsSlice.actions.addnews(action.payload.data.response));
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
      newsdata: [],
      loading: false,
      error: "",
      isCilp:[]
    },
    reducers: {
      addnews: (state, action) => {
        state.newsdata = action.payload;
      },
      addcilp: (state, action) => {
        state.isCilp.push(action.payload)
      },
      deleteCilp: (state, action) => {
        for(let i = 0; i < state.isCilp.length; i++) {
          if(state.isCilp[i] === action.payload)  {
            state.isCilp.splice(i, 1);
            i--;
          }
        }
      },
      },
  });

  
  const initialHistoryList = (() => {
    let initialState = { history: [],clip:[],isClip:false };
    // console.log("history initialState");
    try {
      initialState.history =JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) || [];
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
    },
  });

  export const { addcilp,deleteCilp } = newsSlice.actions;
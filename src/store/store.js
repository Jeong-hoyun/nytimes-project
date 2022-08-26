import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUrl } from "../api/index.js";

export const fetchNewsbyWords = createAsyncThunk(
  "usersSlice/fetchNewsbyWords",
  async (searchInfo, thunkAPI) => {
    try {
      // const res = await axios.get("https://api.github.com/users");
      // return res.data;
      const res = await fetch(getUrl(searchInfo));
      const jsondata = await res.json();
      return jsondata;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const usersSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [fetchNewsbyWords.pending]: (state) => {
      state.loading = true;
      state.news = [];
      state.error = "";
    },
    [fetchNewsbyWords.fulfilled]: (state, action) => {
      state.news = action.payload.response.docs;
      state.loading = false;
      state.error = "";
    },
    [fetchNewsbyWords.rejected]: (state, action) => {
      state.loading = false;
      state.news = [];
      state.error = action.payload;
    },
  },
});

export const clipSlice = createSlice({
  name: "clippednews",
  initialState: {
    clippednews: [
      { id: 1, article: "hello" },
      { id: 2, article: "안녕하세요" },
      { id: 3, article: "こんにちは" },
    ],
  },
  reducers: {
    clip: ({ clippednews }, action) => {
      clippednews.push(action.payload);
    },
    unclip: ({ clippednews }, action) => {
      clippednews.filter((item) => item.id !== action.id);
    },
  },
});

export const Stores = () => {
  const value = useSelector(({ news }) => news.loading);
  const clippednewsList = useSelector(
    ({ clippednews }) => clippednews.clippednews
  );
  const newsList = useSelector(({ news }) => news.news);
  const nextId = React.useRef(4);
  const dispatch = useDispatch();
  const { clip } = clipSlice.actions;

  React.useEffect(() => {
    dispatch(fetchNewsbyWords({ q: "korea", page: 1 }));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      clip({
        id: nextId.current,
        article: event.target.elements.form__input.value,
      })
    );
    nextId.current++;
  };

  return (
    <>
      {value ? "loading" : null}
      <div>store-clippednews</div>
      {clippednewsList.map((item) => (
        <div>
          <div>id: {item.id}</div>
          <div>article: {item.article}</div>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input id="form__input" type="text" />
        <button>add</button>
      </form>
      <br />
      <br />
      <br />
      {console.log("newsList : ", newsList)}
    </>
  );
};

export default Stores;

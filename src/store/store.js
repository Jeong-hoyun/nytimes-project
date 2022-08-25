import React from 'react';

/* const usersSlice = createSlice({
    name: "news",
    initialState: {
      news: [],
      loading: false,    
      error: ""
    },
    reducers: {},
    extraReducers: {
      [fetchUser.pending]: (state) => {
        state.loading = true;
        state.news = [];
        state.error = "";
      },
      [fetchUser.fulfilled]: (state, action) => {
        state.news = action.payload;
        state.loading = false;
        state.error = "";
      },
      [fetchUser.rejected]: (state, action) => {
        state.loading = false;
        state.news = [];
        state.error = action.payload;
      }
    }
  }); */



const Stores = () => {
const [value,setValue]=React.useState();

React.useEffect(() => {
    

}, []);

    return (
        <div>
          store
        </div>
    );
}

export default Stores;
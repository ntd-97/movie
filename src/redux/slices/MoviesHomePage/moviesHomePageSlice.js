import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: [],
  popular: [],
  topRated: [],
  loading: false,
};

const moviesHomePageSlice = createSlice({
  name: "moviesHomePage",
  initialState,
  reducers: {
    getMovies() {},
    setMovies: (state, action) => ({
      ...state,
      nowPlaying: action.payload.nowPlaying,
      popular: action.payload.popular,
      topRated: action.payload.topRated,
    }),
    setLoading: (state, action) => ({ ...state, loading: action.payload }),
  },
});

export const { getMovies, setMovies, setLoading } = moviesHomePageSlice.actions;
export default moviesHomePageSlice.reducer;

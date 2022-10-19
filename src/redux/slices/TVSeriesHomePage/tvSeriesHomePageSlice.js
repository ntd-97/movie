import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onAir: [],
  popular: [],
  topRated: [],
  loading: false,
};

const tvSeriesHomePageSlice = createSlice({
  name: "tvSeriesHomePage",
  initialState,
  reducers: {
    getTvSeries() {},
    setTvSeries: (state, action) => ({
      ...state,
      onAir: action.payload.onAir,
      popular: action.payload.popular,
      topRated: action.payload.topRated,
    }),
    setLoading: (state, action) => ({ ...state, loading: action.payload }),
  },
});

export const { getTvSeries, setTvSeries, setLoading } =
  tvSeriesHomePageSlice.actions;
export default tvSeriesHomePageSlice.reducer;

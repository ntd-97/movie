import { combineReducers } from "@reduxjs/toolkit";

import moviesHomePageReducer from "./slices/MoviesHomePage/moviesHomePageSlice";
import tvSeriesHomePageReducer from "./slices/TVSeriesHomePage/tvSeriesHomePageSlice";

const reducer = combineReducers({
  moviesHomePage: moviesHomePageReducer,
  tvSeriesHomePage: tvSeriesHomePageReducer,
});

export default reducer;

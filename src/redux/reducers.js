import { combineReducers } from "@reduxjs/toolkit";

import LoginInfoReducer from "./slices/loginInfoSlice";
import moviesHomePageReducer from "./slices/moviesHomePageSlice";
import tvSeriesHomePageReducer from "./slices/tvSeriesHomePageSlice";

const reducer = combineReducers({
  moviesHomePage: moviesHomePageReducer,
  tvSeriesHomePage: tvSeriesHomePageReducer,
  loginInfo: LoginInfoReducer,
});

export default reducer;

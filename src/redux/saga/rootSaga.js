import { all, fork } from "redux-saga/effects";

import tvSeriesHomePageSaga from "./TVSeriesHomePage/tvSeriesHomePageSaga";
import moviesHomePageSaga from "./MoviesHomePage/moviesHomePageSaga";

export default function* rootSaga() {
  yield all([fork(moviesHomePageSaga), fork(tvSeriesHomePageSaga)]);
}

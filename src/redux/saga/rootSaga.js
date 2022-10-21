import { all, fork } from "redux-saga/effects";

import tvSeriesHomePageSaga from "./TVSeriesHomePage/tvSeriesHomePageSaga";
import moviesHomePageSaga from "./MoviesHomePage/moviesHomePageSaga";
import loginInfoSaga from "./LoginInfo/loginInfoSaga";

export default function* rootSaga() {
  yield all([fork(moviesHomePageSaga), fork(tvSeriesHomePageSaga),fork(loginInfoSaga)]);
}

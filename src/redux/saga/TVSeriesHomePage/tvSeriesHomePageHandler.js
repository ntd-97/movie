import { call, put } from "redux-saga/effects";

import {
  setTvSeries,
  setLoading,
} from "../../slices/TVSeriesHomePage/tvSeriesHomePageSlice";

import requestGetTvSeries from "./tvSeriesHomePageRequest";

function* handleGetTvSeries() {
  const data = {};

  const apiRequest = requestGetTvSeries();

  try {
    // show loading
    yield put(setLoading(true));
    //get tvseries on air
    const resOnAir = yield call(apiRequest.onAir);
    data.onAir = resOnAir.data.results;
    //get popular tvseries
    const resPopular = yield call(apiRequest.popular);
    data.popular = resPopular.data.results;
    //get top rated tvseries
    const resTopRated = yield call(apiRequest.topRated);
    data.topRated = resTopRated.data.results;
    // set tvseries in store
    yield put(setTvSeries({ ...data }));
    // hide loading
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

export default handleGetTvSeries;

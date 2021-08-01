import { fork } from 'redux-saga/effects';
import { Dashboard } from "./dashboard/Dispatch";

export default function* rootSaga() {
  yield fork(Dashboard)
}
import { takeEvery, select, delay } from "redux-saga/effects";
//import { delay } from "redux-saga";
import { getAuthStatus, getAuth } from "../redux/selectors";

function* toWelcome() {
  yield delay(1000);
  const loginStatus = yield select(getAuthStatus);
  const user = yield select(getAuth);
  if (loginStatus) alert("Welcome ,  " + user.username);
}
export default function* rootSaga() {
  yield takeEvery("AUTH_USER", toWelcome);
}

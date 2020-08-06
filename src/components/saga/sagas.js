import { takeEvery, select, delay, call, put } from "redux-saga/effects";
//import { delay } from "redux-saga";
import { getAuthStatus, getAuth } from "../redux/selectors";
import { jsonData, authUser } from "../redux/actions/action";

function* toWelcome() {
  const userr=yield select(getAuth);
  let username=userr.username;
  let password=userr.password;
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({username, password }),
  };
  const js = yield call(()=>
    fetch(`/users/authenticate`, requestOptions)
      .then(handleResponse)
      .then(
        (user) => {
          localStorage.setItem("user", JSON.stringify(user));
         return user
        },
        (error) => {
          alert(error);
          return undefined;}
      )
  ); 
  //если мы получили данные а не ошибку, меняем авторизацию на залогиненную, если вывводится ошибка функция останавливается
  if(js) yield put(authUser(true))
  else return
  //добавляем в стор полученный json
  yield put(jsonData(js))
  //приветствуем полльзователя
  yield delay(1000);
  const loginStatus = yield select(getAuthStatus);
  const user = yield select(getAuth);
  if (loginStatus) alert("Welcome ,  " + user.username);
}
export default function* rootSaga() {
  yield takeEvery("USER_DATA", toWelcome);
}

async function handleResponse(response) {
  const data = await response.text().then((text) => JSON.parse(text));
  return data;
}

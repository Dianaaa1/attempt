import { takeEvery, select, delay, call, put } from "redux-saga/effects";
import qs from "qs";
import { getAuthStatus, getAuth } from "../redux/selectors";
import { jsonData, authUser } from "../redux/actions/action";

function* toWelcome() {
  const user = yield select(getAuth);
  let username = user.username;
  let password = user.password;
  const js = yield call(async () => {
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: qs.stringify({ username: username, password: password }),
    })
      .then((response) => {
        console.log("res  ", response);
        return response.clone().text();
      })
      .then((response) => {
        if (response === "Unauthorized") {
          alert("Ошибка авторизации");
          return;
        }
        const js = JSON.parse(response).message;
        const token = JSON.parse(response).token;
        localStorage.setItem("token", token);
        return js;
      })
      .catch((error) => {
        Promise.reject(error);
      });
  });
  //если мы получили данные а не ошибку, меняем авторизацию на залогиненную, если вывводится ошибка функция останавливается
  if (localStorage.getItem("token")) yield put(authUser(true));
  else return;
  //добавляем в стор полученный json
  yield put(jsonData(js));
  //приветствуем полльзователя
  yield delay(1000);
  const loginStatus = yield select(getAuthStatus);
  if (loginStatus) alert("Welcome ,  " + user.username);
}
export default function* rootSaga() {
  yield takeEvery("USER_DATA", toWelcome);
}
interface Idata {
  id: number;
  username: string;
  password: string;
}

async function handleResponse(response: Response): Promise<Idata> {
  const data = await response.text().then((text: string) => JSON.parse(text));
  return data;
}
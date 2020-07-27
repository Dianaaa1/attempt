import React, {useState} from "react";
import { Redirect } from "react-router-dom";

function Login () {
  logout();
  const [user, updateInf] = useState({
    username: "",
    password: "",
    error: "",
    login: false,
  })
  
  const handleChange=(e) => {
    const { name, value } = e.target;
    updateInf({ [name]: value });
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const username=e.target.username.value;
    const password=e.target.password.value;

    //останавливается если форма пустая
    if (!(username && password)) {
      alert("Введите все данные");
      return;
    }

    login(username, password).then(
      (user) => {
        updateInf({ login: true });
      },
      (error) => {
        updateInf({ error: false });
      }
    );
  }
    const { username, password } = user;
    // если пользователь залогинен то перенаправляем на форму создания проектов
    if (user.login) {
      return (
        <Redirect
          to={{
            pathname: "/form",
          }}
        />
      );
    }
    return (
      <div>
        <form name="form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button>Login</button>
          </div>
        </form>
      </div>
    );
  }

function login(username, password) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({ username, password }),
  };
  return fetch(`/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
    });
}

function logout() {
  localStorage.removeItem("user");
}

async function handleResponse(response) {
  const data = await response.text().then((text) => JSON.parse(text));
  return data;
}
export default Login;

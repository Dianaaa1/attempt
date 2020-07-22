import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);

       logout();

        this.state = {
            username: '',
            password: '',
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { username, password, error } = this.state;

        //останавливается если форма пустая
        if (!(username && password)) {
            alert("Введите все данные");
            return;
        }

        this.setState({ loading: true });
        login(username, password)
            .then(
                user => {
                },
                error =>{this.setState({ error, loading: false });
                alert(error)}
            );
    }
    render() {
        const { username, password } = this.state;
        return (
            <div >
                <form name="form" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" value={username} onChange={this.handleChange} />
                    </div>
                    <div >
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={password} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <button >Login</button>
                    </div>
                </form>
            </div>
        );
    }
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
  alert(JSON.stringify(data));
  return data;
}
export default Login;

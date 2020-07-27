export function configureFakeBackend() {
  let users = [
    { id: 1, username: "zzzz", password: "zzzz" },
    { id: 2, username: "test", password: "test" },
  ];
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //проверяю запрос
        if (url === "/users/authenticate" && opts.method === "POST") {
          //беру параметры с тела запроса
          let params = JSON.parse(opts.body);

          //выбираю пользователя у которого совпадает пароль и имя с входными данными
          let filteredUsers = users.filter((user) => {
            return (
              user.username === params.username &&
              user.password === params.password
            );
          });

          if (filteredUsers.length) {
            //проверяю не пустой ли массив (есть ли элемент который совпадает)
            let user = filteredUsers[0];
            let responseJson = {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
            };
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(responseJson)),
            });
          } else {
            // возвращаю ошибку
            reject("Имя пользователя или пароль неверны");
          }

          return;
        }
      }, 500);
    });
  };
}

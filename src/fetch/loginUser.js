import apiUrl from 'constants/constants'

function loginUser(email, password) {
  const body = {
    email: email,
    password: password
  }

  return new Promise((resolve, reject) => {
    fetch(apiUrl + '/user/login', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body)
    })
    .then(response => {
      if (response.status == 200) {
        resolve();
      } else if (response.status == 403) {
        reject();
      }
    })
  });
}

export default loginUser;
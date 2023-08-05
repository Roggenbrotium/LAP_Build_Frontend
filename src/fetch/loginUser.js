import apiUrl from 'constants/constants'
import Cookies from 'js-cookie';

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
        console.warn(response.headers.get('set-cookie'));
        //Cookies.set('JSESSIONID', response.headers['JSESSIONID'])
        resolve();
      } else if (response.status == 403) {
        reject();
      }
    })
  });
}

export default loginUser;
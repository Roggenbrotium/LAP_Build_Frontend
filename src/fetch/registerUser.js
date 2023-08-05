import apiUrl from 'constants/constants'

function registerUser(email, password, telephone, billingAddress, deliveryAddress) {
  const body = {
    email: email,
    password: password,
    telephone: telephone,
    billingAddress: billingAddress,
    deliveryAddress: deliveryAddress
  }

  return new Promise((resolve, reject) => {
    fetch(apiUrl + '/user/register', {
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
        resolve(response.json());
      } else if (response.status == 403) {
        reject();
      }
    })
  });
}

export default registerUser;
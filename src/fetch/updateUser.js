import apiUrl from 'constants/constants'

function updateUser(telephone, billingAddress, deliveryAddress) {
  const body = {
    telephone: telephone,
    billingAddress: billingAddress,   
    deliveryAddress: deliveryAddress
  }

  return new Promise((resolve, reject) => {
    fetch(apiUrl + '/user/update', {
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
      }
    })
  });
}

export default updateUser;
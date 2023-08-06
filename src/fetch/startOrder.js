import apiUrl from 'constants/constants'

function startOrder(email, telephone, billingAddress, deliveryAddress, paymentMethod, simpleProducts) {
  const body = {
    email: email,
    telephone: telephone,
    billingAddress: billingAddress,   
    deliveryAddress: deliveryAddress,
    paymentMethod: paymentMethod,
    simpleProducts: simpleProducts
  }

  return new Promise((resolve, reject) => {
    fetch(apiUrl + '/ordering/start', {
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

export default startOrder;
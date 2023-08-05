import apiUrl from 'constants/constants'

function addProduct(id) {
  const body = {
    id: id,
    amount: 1
  }

  return new Promise((resolve, reject) => {
    fetch(apiUrl + '/basket/add', {
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

export default addProduct;
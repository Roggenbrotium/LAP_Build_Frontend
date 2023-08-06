import apiUrl from 'constants/constants'

function getManyProducts(ids) {
  const body = {
    ids: ids,
  }

  return new Promise((resolve, reject) => {
    fetch(apiUrl + '/product/many', {
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
      }
    })
  });
}

export default getManyProducts;
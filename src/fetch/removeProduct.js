import apiUrl from 'constants/constants'

function removeProduct(id) {
  return new Promise((resolve, reject) => {
    fetch(apiUrl + '/basket/remove/' + id, {
      method: "GET",
      credentials: "include"
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

export default removeProduct;
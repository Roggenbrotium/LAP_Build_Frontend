import apiUrl from 'constants/constants'

function getProduct(id) {
    return new Promise((resolve, reject) => {
        fetch(apiUrl + '/product/get/' + id)
        .then(response => {
          resolve(response.json());
        })
    });
}

export default getProduct;
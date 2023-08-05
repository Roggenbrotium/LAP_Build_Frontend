import apiUrl from 'constants/constants'

function getProducts() {
    return new Promise((resolve, reject) => {
        fetch(apiUrl + '/product/all')
        .then(response => {
          resolve(response.json());
        })
    });
}

export default getProducts;
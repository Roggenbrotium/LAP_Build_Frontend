import apiUrl from 'constants/constants'

function listBasket() {
    return new Promise((resolve, reject) => {
        fetch(apiUrl + '/basket/list', {
          method: 'GET',
          credentials: "include",
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

export default listBasket;
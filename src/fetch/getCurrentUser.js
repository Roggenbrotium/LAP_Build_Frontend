import apiUrl from 'constants/constants'

function getCurrentUser() {
    return new Promise((resolve, reject) => {
        fetch(apiUrl + '/user/get', {
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

export default getCurrentUser;
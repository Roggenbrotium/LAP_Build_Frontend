import apiUrl from 'constants/constants'

function logoutUser() {
    return new Promise((resolve, reject) => {
        fetch(apiUrl + '/user/logout', {
          method: 'GET',
          credentials: "include",
        })
        .then(response => {
          if (response.status == 200) {
            resolve(response.json());
          }
        })
    });
}

export default logoutUser;
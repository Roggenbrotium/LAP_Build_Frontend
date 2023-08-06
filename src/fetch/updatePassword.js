import apiUrl from 'constants/constants'

function updatePassword(oldPassword, newPassword) {
  const body = {
    oldPassword: oldPassword,
    newPassword: newPassword,   
  }

  return new Promise((resolve, reject) => {
    fetch(apiUrl + '/user/update/password', {
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

export default updatePassword;
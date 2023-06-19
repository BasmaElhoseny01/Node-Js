import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/users/login',
      data: {
        email,
        password
      }
    })
    console.log(res)
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!')
      window.setTimeout(() => {
        location.assign('/');
      }, 1500)
    }
  }
  catch (error) {
    // console.log(error)
    showAlert('error', error.response.data.message)
  }
};

export const logOut = async () => {
  console.log("looooooo")
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/v1/users/logout',
    });
    //refresh the page
    if (res.data.status == 'success') location.reload(true);
  }
  catch (err) {
    console.log(err.response)
    showAlert("error", 'Error logging out! Try again.')
  }
}
import axios from 'axios';

const url = '/api/users/';

export const allUsers = () => {
  const token = localStorage.getItem('token');
  return axios.get(url + 'allUsers/', {
    headers: {
      "x-auth-token": token
    }
  });
}

export const user = (id) => {
  const token = localStorage.getItem('token');
  return axios.get(url + 'user/' + id, {
    headers: {
      "x-auth-token": token
    }
  });
}
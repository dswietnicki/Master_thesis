import axios from 'axios';

const url = '/api/comments/';

export const getComments = (id) => {
  const token = localStorage.getItem('token');
  return axios.get(url + '/' + id, {
    headers: {
      "x-auth-token": token
    }
  });
}

export const addComment = (comment) => {
  const token = localStorage.getItem('token');
  return axios.post(url, comment, {
    headers: {
      "x-auth-token": token
    }
  })
}
import axios from 'axios';

const url = '/api/projects/';

export const getProject = (id) => {
  const token = localStorage.getItem('token');
  return axios.get(url + 'project/' + id, {
    headers: {
      "x-auth-token": token
    }
  });
}

export const getAllProjects = () => {
  const token = localStorage.getItem('token');
  return axios.get(url + 'allProjects', {
    headers: {
      "x-auth-token": token
    }
  })
}

export const getProjectsOfUser = (id) => {
  const token = localStorage.getItem('token');
  return axios.get(url + 'projectsOfUser/' + id, {
    headers: {
      "x-auth-token": token
    }
  })
}

export const addProject = (project) => {
  const token = localStorage.getItem('token');
  return axios.post(url, project, {
    headers: {
      "x-auth-token": token
    }
  })
}
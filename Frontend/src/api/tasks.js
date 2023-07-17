import axios from 'axios';

const url = '/api/tasks/';

export const addTask = (task) => {
  const token = localStorage.getItem('token');
  return axios.post(url,task, {
    headers: {
      "x-auth-token": token
    }
  });
}

export const getTasksFromProject = (id) => {
  const token = localStorage.getItem('token');
  return axios.get(url + 'tasksOfProject/' + id, {
    headers: {
      "x-auth-token": token
    }
  });
}

export const getTasksOfUser = (id) => {
  const token = localStorage.getItem('token');
  return axios.get(url + 'tasksOfUser/' + id, {
    headers: {
      "x-auth-token": token
    }
  });
}

export const getTask = (id) => {
  const token = localStorage.getItem('token');
  return axios.get(url + 'task/' + id, {
    headers: {
      "x-auth-token": token
    }
  })
}

export const deleteTask = (id) => {
  const token = localStorage.getItem('token');
  return axios.delete(url + 'task/' + id, {
    headers: {
      "x-auth-token": token
    }
  })
}

export const editTask = (id, description) => {
  const token = localStorage.getItem('token');
  return axios.put(url + id, {description}, {
    headers: {
      "x-auth-token": token
    }
  })
}

export const setStatus = (id, status) => {
  const token = localStorage.getItem('token');
  return axios.put(url + 'status/' + id, {status}, {
    headers: {
      "x-auth-token": token
    }
  })
}

export const assignTask = (id, asignee) => {
  const token = localStorage.getItem('token');
  return axios.put(url + 'asignee/' + id, {...asignee}, {
    headers: {
      "x-auth-token": token
    }
  })
}
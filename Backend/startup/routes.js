const express = require('express');
const cors = require('cors')
const users = require('../routes/users');
const projects = require('../routes/projects');
const auth = require('../routes/auth');
const tasks = require('../routes/tasks');
const comments = require('../routes/comments');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use(cors());
  app.use('/users', users);
  app.use('/projects', projects);
  app.use('/tasks', tasks);
  app.use('/comments', comments);
  app.use('/auth', auth);
  app.use(error);
}
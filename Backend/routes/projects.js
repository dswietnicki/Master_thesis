const auth = require('../middleware/auth');
const { Project, validate } = require('../models/project');
const express = require('express');
const router = express.Router();

router.get('/project/:id', auth, async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).send('There is no such project');

  res.send(project);
});

router.get('/allProjects', auth, async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

router.get('/projectsOfUser/:id', auth, async (req, res) => {
  const projects = await Project.find({"users.id": req.params.id});
  res.send(projects);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let project = new Project(req.body);
  project = await project.save();

  res.send(project);
});

module.exports = router; 

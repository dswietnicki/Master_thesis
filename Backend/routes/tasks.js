const auth = require('../middleware/auth');
const { Task, validate } = require('../models/task');
const express = require('express');
const router = express.Router(); 

router.get('/task/:id', auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send('There is no such task');

  res.send(task);
});

router.delete('/task/:id', auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send('There is no such task');

  const deletedTask = await Task.deleteOne({ _id: req.params.id });

  res.send(deletedTask);
});

router.get('/tasksOfUser/:id', auth, async (req, res) => {
  const tasks = await Task.find({"asignee.id": req.params.id});
  res.send(tasks);
});

router.get('/tasksOfProject/:id', auth, async (req, res) => {
  const tasks = await Task.find({"projectId": req.params.id}).sort('priority');
  res.send(tasks);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let task = new Task(req.body);
  task = await task.save();

  res.send(task);
});

router.put('/:id', auth, async (req, res) => {
  let task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send('There is no such task');

  task.description = req.body.description;
  task = await task.save();

  res.send(task);
})

router.put('/status/:id', auth, async (req, res) => {
  let task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send('There is no such task');

  task.status = req.body.status;
  task = await task.save();

  res.send(task);
});

router.put('/priority/:id', auth, async (req, res) => {
  let task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send('There is no such task');

  task.priority = req.body.priority;
  task = await task.save();

  res.send(task);
});

router.put('/asignee/:id', auth, async (req, res) => {
  let task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send('There is no such task');

  task.asignee = req.body;
  task = await task.save();

  res.send(task);
});

module.exports = router; 

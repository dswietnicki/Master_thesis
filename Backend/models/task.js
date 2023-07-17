const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  surname: {
    type: String,
    minlength: 1,
    maxlength: 50
  },
}, { _id: false })

const creatorSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  surname: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
}, { _id: false })

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250
  },
  creator: {
    type: creatorSchema,
    required: true
  },
  projectId: {
    type: String,
    required: true,
  },
  asignee: {
    type: userSchema,
    default: { id: 0, name: 'none' }
  },
  status: {
    type: String,
    enum: ['TO_DO', 'IN_PROGRESS', 'DONE'],
    default: 'TO_DO'
  },
  priority: {
    type: Number,
    enum: [1, 2, 3],
    default: 3
  }
});

const Task = mongoose.model('Task', taskSchema);

function validateTask(task) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).max(250).required(),
    creator: Joi.object(),
    projectId: Joi.string().required(),
    asignee: Joi.object(),
    status: Joi.string(),
    priority: Joi.number()
  };

  return Joi.validate(task, schema);
}

exports.Task = Task;
exports.validate = validateTask;
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
}, { _id : false })

const projectSchema = new mongoose.Schema({
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
  users: {
    type: [userSchema],
  },
  creator: {
    type: userSchema,
    required: true,
  },
});

const Project = mongoose.model('Project', projectSchema);

function validateProject(project) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).max(250).required(),
    users: Joi.array(),
    creator: Joi.object()
  };

  return Joi.validate(project, schema);
}

exports.Project = Project;
exports.validate = validateProject;
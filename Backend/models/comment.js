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
    required: true,
    minlength: 1,
    maxlength: 50
  },
}, { _id : false })

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 2048,
  },
  taskId: {
    type: String,
    required: true,
  },
  author: {
    type: userSchema,
    default: { id: 0, name: 'none', surname: 'none'}
  },
  date: {
    type: Date,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment) {
  const schema = {
    text: Joi.string().min(1).max(2048).required(),
    taskId: Joi.string().required(),
    author: Joi.object(),
    date: Joi.date(),
  };

  return Joi.validate(comment, schema);
}

exports.Comment = Comment;
exports.validate = validateComment;
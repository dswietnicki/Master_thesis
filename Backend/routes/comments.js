const auth = require('../middleware/auth');
const { Comment, validate } = require('../models/comment');
const express = require('express');
const moment = require('moment');
const router = express.Router();

router.get('/:taskId', auth, async (req, res) => {
  const comments = await Comment.find({"taskId": req.params.taskId});
  res.send(comments);
});

router.post('/', async (req, res) => {  
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let comment = new Comment(req.body);
  comment.date = moment().format();
  comment = await comment.save();

  res.send(comment);
});

module.exports = router; 

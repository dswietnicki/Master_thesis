const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/user', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.get('/allUsers', auth, async (req, res) => {
  const user = await User.find().select('-password -email -login');
  res.send(user);
});

router.post('/register', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ login: req.body.login });
  if (user) return res.status(400).send('User already registered.');

  // _ - lodash, podajemy objekt i ktore properties wybieramy
  user = new User(_.pick(req.body, ['login', 'surname', 'name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'login', 'email']));
});


router.post('/login', async (req, res) => {
  let user = await User.findOne({ login: req.body.login });
  if (!user) return res.status(404).send('The credentials you supplied were not correct');

  const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordCorrect) return res.status(404).send('The credentials you supplied were not correct');

  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(user);
});
module.exports = router; 

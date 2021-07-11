const express = require('express');
const router = express.Router();

const users = ['admin'];

router.get('/', (req, res, next) => {
  res.render('pages/login', {
    title: 'Prove Assignment 12',
    path: '/proveAssignments/12',
  });
});

router.post('/login', (req, res, next) => {
  const { username } = req.body;

  if (!username || username.trim() === '')
    return res.status(400).send({ error: 'Cannot be left blank, please enter a valid username' });

  if (users.includes(username.trim()))
    return res.status(409).send({ error: 'This username is already taken, please choose a different one' });

  users.push(username.trim());
  req.session.user = username;
  res.status(200).send({ username: username.trim() });
});

router.get('/chat', (req, res, next) => {
  res.render('pages/chat', {
    title: 'Prove Assignment 12',
    path: '/proveAssignments/12',
    user: req.session.user,
  });
});

module.exports = router;
const express = require('express');
const router = express.Router();

const users = ['admin'];

router.get('/', (req, res, next) => {
  res.render('pages/pr12-login', {
    title: 'Prove Assignment 12',
    path: '/proveAssignments/12',
  });
});

router.post('/login', (req, res, next) => {
  const { username } = req.body;

  if (!username || username.trim() === '')
    return res.status(400).send({ error: 'Username cannot be empty!' });

  if (users.includes(username.trim()))
    return res.status(409).send({ error: 'Username is taken!' });

  users.push(username.trim());
  req.session.user = username;
  res.status(200).send({ username: username.trim() });
});

router.get('/chat', (req, res, next) => {
  res.render('pages/pr12-chat', {
    title: 'Prove Assignment 12',
    path: '/proveAssignments/12',
    user: req.session.user,
  });
});

module.exports = router;
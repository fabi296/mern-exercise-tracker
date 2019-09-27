const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

router.get('/', (req, res, next) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => next(err));
});

router.post('/add', (req, res, next) => {
    const username = req.body.username;
    const newUser = new User({username});
    newUser.save()
        .then(() => res.status(201).json('User added!'))
        .catch(err => next(err));
})

module.exports = router;
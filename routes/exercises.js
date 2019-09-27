const express = require('express');
const Exercise = require('../models/exercise.model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Exercise.find()
        .then(exercises => res.status(200).json(exercises))
        .catch(err => next(err));
});

router.post('/add', (req, res, next) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
        .then(() => res.status(200).json('Exercise added!'))
        .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.status(200).json(exercise))
        .catch(err => next(err));
})

router.delete('/:id', (req, res, next) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json('Exercise deleted'))
        .catch(err => next(err));
});

router.put('/:update/:id', (req, res, next) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username,
            exercise.description = req.body.description,
            exercise.duration = Number(req.body.duration),
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.status(200).json('Exercise Updated'))
                .catch(err => next(err));
        })
        .catch(err => next(err));
});

module.exports = router;
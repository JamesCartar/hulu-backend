const express = require('express');
const { getAllMovie, getMovie, createMovie, updateMovie, deleteMovie, getRandomScreenPlay } = require('../controllers/movieController.js')

const router = express.Router();

router.route('/')
    .get(getAllMovie)
    .post(createMovie);

router.route('/random')
    .get(getRandomScreenPlay);

router.route('/:id')
    .get(getMovie)
    .put(updateMovie)
    .delete(deleteMovie);



module.exports = router;
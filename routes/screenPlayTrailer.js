const express = require('express');

const { getTwentyMoviesTrailers, getTwentyTvShowsTrailers } = require('../controllers/trailerController')

const router = express.Router();

router.get('/movies', getTwentyMoviesTrailers);
router.get('/series', getTwentyTvShowsTrailers);

module.exports = router;
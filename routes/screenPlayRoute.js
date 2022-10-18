const express = require('express');

const { getTwentyMovies, getTwentyTvShows, getFeatureMovie } = require('../controllers/screenPlayController.js')

const router = express.Router();

router.get('/twentymovie', getTwentyMovies);
router.get('/twentytvshow', getTwentyTvShows);
router.get('/featureMovie', getFeatureMovie);

module.exports = router;
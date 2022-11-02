const express = require('express');

const { getAllWatchList, addWatchList, deleteAScreenPlayWatchList, clearWatchList } = require('../controllers/watchListController.js');

const router = express.Router();

router.route('/')
    .get(getAllWatchList)
    .post(addWatchList);

router.route('/clear/:user_id')
    .delete(clearWatchList);
    
router.route('/:id')
    .delete(deleteAScreenPlayWatchList);




module.exports = router;
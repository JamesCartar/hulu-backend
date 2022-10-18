const express = require('express');

const { getAllUsers, getUser, updateUser, deleteUser, getStats } = require('../controllers/userController.js')

const router = express.Router();

router.route('/')
    .get(getAllUsers);
    
router.route('/stats')
    .get(getStats);

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router;
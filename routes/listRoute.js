const express = require('express');
const { getAllList, createList, deleteList } = require('../controllers/listController.js')

const router = express.Router();

router.route('/')
    .get(getAllList)
    .post(createList);

router.route('/:id')
    .delete(deleteList);



module.exports = router;
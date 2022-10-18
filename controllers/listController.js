const listModel = require('../models/List.js');



// get lists
const getAllList = async (req, res, next) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
        if(typeQuery) {
            if(genreQuery) {
                list = await listModel.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } },
                ])
            } else {
                list = await listModel.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } },
                ])
            }
        } else {
            list = await listModel.aggregate([{ $sample: { size: 10 } }])
        }
        res.status(200).json({success: true, list: list})
    } catch (error) {
        res.status(500).json({success: false, msg: error.message})
    }
}

// create a list
const createList = async (req, res, next) => {
    if(req.jwt.isAdmin) {
        const newList = new listModel(req.body);
        try {
            const savedList = await newList.save();
            res.status(201).json({success: true, movie: savedList})
        } catch (error) {
            res.status(500).json({success: false, msg: error.message})
        }
    } else {
        res.status(403).json({success: false, msg: 'You are not allowed !'})
    }
}

// delete a list
const deleteList = async (req, res, next) => {
    if(req.jwt.isAdmin) {
        try {
            await listModel.findByIdAndDelete(req.params.id);
            res.status(201).json({success: true, msg: `Movie with the id of ${req.params.id} has been deleted!`})
        } catch (error) {
            res.status(500).json({success: false, msg: error.message})
        }
    } else {
        res.status(403).json({success: false, msg: 'You are not allowed !'})
    }
}



module.exports = { getAllList, createList, deleteList };
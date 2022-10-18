const movieModel = require('../models/Movie.js');



// get all movies
const getAllMovie = async (req, res, next) => {
    if(req.jwt.isAdmin) {
        const movies = await movieModel.find();
        try {
            res.status(201).json({success: true, movies: movies.reverse()})
        } catch (error) {
            res.status(500).json({success: false, msg: error.message})
        }
    } else {
        res.status(403).json({success: false, msg: 'You are not allowed !'})
    }
}

// get a single movie
const getMovie = async (req, res, next) => {
    try {
        const movie = await movieModel.findById(req.params.id);
        res.status(201).json({success: true, movie: movie})
    } catch (error) {
        res.status(500).json({success: false, msg: error.message})
    }
}

// get a random screenPlay
const getRandomScreenPlay = async (req, res, next) => {
    const type = req.query.type;
    let screenPlay;
    try {
        if(type === 'series') {
            screenPlay = await movieModel.aggregate([
                { $match: { isSeries: true }},
                { $sample: { size: 1 } }
            ])
        } else {
            screenPlay = await movieModel.aggregate([
                { $match: { isSeries: false }},
                { $sample: { size: 1 } }
            ])
        }
        res.status(200).json(screenPlay)
    } catch(error) {
        res.status(500).json({success: false, msg: error.message})
    }
}

// create a movie
const createMovie = async (req, res, next) => {
    if(req.jwt.isAdmin) {
        const newMovie = new movieModel(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(201).json({success: true, movie: savedMovie})
        } catch (error) {
            res.status(500).json({success: false, msg: error.message})
        }
    } else {
        res.status(403).json({success: false, msg: 'You are not allowed !'})
    }
}

// update a movie
const updateMovie = async (req, res, next) => {
    if(req.jwt.isAdmin) {
        const updatedMovie = new movieModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        try {
            res.status(201).json({success: true, movie: updatedMovie})
        } catch (error) {
            res.status(500).json({success: false, msg: error.message})
        }
    } else {
        res.status(403).json({success: false, msg: 'You are not allowed !'})
    }
}

// delete a movie
const deleteMovie = async (req, res, next) => {
    if(req.jwt.isAdmin) {
        await movieModel.findByIdAndDelete(req.params.id);
        try {
            res.status(201).json({success: true, msg: `Movie with the id of ${req.params.id} has been deleted!`})
        } catch (error) {
            res.status(500).json({success: false, msg: error.message})
        }
    } else {
        res.status(403).json({success: false, msg: 'You are not allowed !'})
    }
}



module.exports = { getAllMovie, getMovie, createMovie, updateMovie, deleteMovie, getRandomScreenPlay };
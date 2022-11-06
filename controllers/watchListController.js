const watchListModel = require('../models/WatchList');



// get all the movies
const getAllWatchList = async (req, res, next) => {
    if(req.jwt) {
        try {
            const watchList = await watchListModel.find({user_id: req.jwt.sub});
            const movieList = watchList.filter((screenPlay) => screenPlay.type === 'movie');
            const tvList = watchList.filter((screenPlay) => screenPlay.type === 'tv');
            

            if(watchList.length > 0) {
                res.status(200).json({success: true, watchList: {
                    movieList,
                    tvList
                }});
            } else {
                res.status(200).json({success: true, watchList: {
                    movieList: [],
                    tvList: []
                }});
            }
        } catch (error) {
            res.status(500).json({success: false, msg: error.message})
        }
    } else {
        res.status(403).json({success: false, msg: 'You are not allowed !'})
    }
}

// add a movie to watchList
const addWatchList = async (req, res, next) => {
    if(req.jwt) {
        watchListModel.findOne({ title: req.body.title })
        .then(async screenPlay => {
            if(screenPlay) {
                res.status(200).json({success: false, msg: 'Already exist in watch list!'})
            } else {
                const newMovie = new watchListModel(req.body);
                try {
                    const savedMovie = await newMovie.save();
                    res.status(201).json({ success: true, msg: `Has added to watch list !` })
                } catch (error) {
                    res.status(500).json({success: false, msg: error.message})
                }
            }
        })
    } else {
        res.status(403).json({success: false, msg: 'You are not allowed!'})
    }
}


// delete single WatchList
const deleteAScreenPlayWatchList = async (req, res, next) => {
    if(req.jwt) {
        watchListModel.findById(req.params.id)
        .then(async (screenPlay) => {
            if(screenPlay && screenPlay.user_id === req.jwt.sub) {        
                await watchListModel.findByIdAndDelete(req.params.id);
                try {
                    res.status(201).json({success: true, msg: `ScreenPlay with the id of ${req.params.id} has been deleted!`})
                } catch (error) {
                    res.status(500).json({success: false, msg: error.message})
                }
            } else {
                res.status(403).json({success: false, msg: 'You are not admin of this list !'})
            }
        }).catch(e => {
            res.status(500).json({success: false, msg: e.message})
        })
    } else {
        res.status(403).json({success: false, msg: 'You are not allowed !'})
    }
};


// clear WatchList
const clearWatchList = async (req, res, next) => {
    if(req.jwt) {
        const watchList = await watchListModel.find({user_id: req.params.user_id});
        for(let screenPlay of watchList) {
            if(screenPlay.user_id === req.jwt.sub) {
                await watchListModel.findByIdAndDelete(screenPlay._id);
                console.log(`ScreenPlay with the id of ${screenPlay._id} has been deleted!`);
            } else {
                res.status(403).json({success: false, msg: 'You are not allowed !'})
            }
        }
        res.status(403).json({success: true, msg: 'You have successfully clear your watch list !'})
    } else {
        res.status(403).json({success: false, msg: 'You are not allowed !'})
    }
}



module.exports = { getAllWatchList, addWatchList, deleteAScreenPlayWatchList, clearWatchList };
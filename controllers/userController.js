if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const utils = require('../utils/passwordUtils.js');
const userModel = require('../models/User.js');


const getAllUsers = async (req, res, next) => {
    const query = req.query.new;
    if(req.jwt.isAdmin) {
        try {
            const users = query ? await userModel.find().sort({ _id: -1 }).limit(5) :  await userModel.find();
            res.status(200).json({success: true, users: users})
        } catch (error) {
        res.status(500).json({success: false, msg: error.message})  
        }
    } else {
        res.status(403).json({success: false, msg: 'You are not allowed to see all users!'})
    }
}

const getStats = async (req, res, next) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);

    const monthsArray = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    try {
        const data = await userModel.aggregate([
            {
                $project: {
                    month: {$month: '$createdAt'}
                }
            },
            {
                $group: {
                    _id: '$month',
                    total: {$sum: 1}
                }
            }
        ])
        res.status(200).json({success: true, stats: data})
    } catch(err) {
        res.status(500).json({success: false, msg: err.message})
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id)
        
        const {_doc: { hash, salt, ...userInfoToSend }} = user;
        res.status(200).json({success: true, user: userInfoToSend})
    } catch (error) {
    res.status(500).json({success: false, msg: error.message})  
    }
}

const updateUser = async (req, res, next) => {
    if(req.jwt.sub === req.params.id || req.jwt.isAdmin) {
        if(req.body.password) {
            const saltHash = utils.genPassword(req.body.password);
            req.body.hash = saltHash.salt;
            req.body.salt = saltHash.hash;
        }

        try {
            const updatedUser = await userModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json({success: true, msg: `user with the id of ${updatedUser._id} has been updated!`})
        } catch (error) {
          res.status(500).json({success: false, msg: error.message})  
        }
    } else {
        res.status(403).json({success: false, msg: 'You can only update your account!'})
    }
}

const deleteUser = async (req, res, next) => {
    if(req.jwt.sub === req.params.id || req.jwt.isAdmin) {
        try {
            await userModel.findByIdAndDelete(req.params.id)
            res.status(200).json({success: true, msg: `User with the id of ${req.params.id} has been deleted!`})
        } catch (error) {
        res.status(500).json({success: false, msg: error.message})  
        }
    } else {
        res.status(403).json({success: false, msg: 'You can only delete your account!'})
    }
}

module.exports = { getAllUsers, getUser, updateUser, deleteUser, getStats };
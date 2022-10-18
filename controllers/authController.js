const utils = require('../utils/passwordUtils.js');
const userModel = require('../models/User.js');

const register = (req, res, next) => {
    const {name, email, password, isAdmin} = req.body;

    userModel.findOne({$or: [{ name: name }, { email: email }]})
        .then(user => {
            if(user) {
                return res.status(409).json({success: false, msg: 'User already exists!'})
            } else {
                const saltHash = utils.genPassword(password);
                const salt = saltHash.salt;
                const hash = saltHash.hash;
                
                const newUser = new userModel({ name, email, hash, salt, isAdmin});
                newUser.save()
                    .then(user => {
                        const jwt = utils.issueJWT(user);
                        
                        const {_doc: { _id, email, name, isAdmin, ...userInfoToSend }} = user;
                        return res.status(201).json({ success: true, _id, email, name, isAdmin, token: jwt.token, expires: jwt.expires})
                    })
                    .catch(err => next(err))
            }
        })
}

const login =  (req, res, next) => {
    userModel.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({success: false, msg: 'Could not find the user!'});
            }

            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
            
            
            const {_doc: { _id, email, name, isAdmin, ...userInfoToSend }} = user;

            if(isValid) {
                const tokenObject = utils.issueJWT(user);
                return res.status(200).json({success: true, _id, email, name, isAdmin, token: tokenObject.token, expires: tokenObject.expires});
            } else {
                return res.status(401).json({ success: false, msg: 'You entered the wrong password'});
            }
        })
        .catch(err => next(err));
}

const logout = (req, res, next) => {
    
}

module.exports = {register, login, logout};
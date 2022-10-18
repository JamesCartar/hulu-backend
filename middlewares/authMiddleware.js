const jsonwebtoken = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const pathToKey = path.join(__dirname + '/../keys', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

async function authMiddleware(req, res, next) {
    if(!req.headers.authorization) {
        res.status(401).json({success: false, msg: 'You are not authorized to visit this route!'})
    } else {
        const tokenParts = req.headers.authorization.split(' ');

        if(tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
            try {
                const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, { algorithms: [ 'RS256' ] });
                req.jwt = verification;
                next();
            } catch (error) {
            return res.status(401).json({success: false, msg: 'You are not authorized to visit this route!'});
            }
        } else {
            return res.status(401).json({success: false, msg: 'You are not authorized to visit this route!'});
        }
    }
} 


module.exports = { authMiddleware };
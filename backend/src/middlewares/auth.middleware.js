import jwt from 'jsonwebtoken'
import blackListTokenModel from '../models/blacklist.model.js';

async function authUser(req, res, next) {
    const token = req.cookies.token;
    
    if(!token) {
        return res.status(401).json({
            message: "Token not provided in the Request"
        })
    }

    const isBlackListToken = await blackListTokenModel.findOne({token});

    if(isBlackListToken) {
        return res.status(401).json({
            message: "The token in the request is Expired"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err) {
        return res.status(401).json({
            message: "Invalid token provided"
        });
    }
} 


export default authUser;
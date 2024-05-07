import CustomError from "../customError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const verifyToken = async(req, res, next) => {
    try {
        const beararToken = req.headers['authorization'];
        if (!beararToken) throw new CustomError('unauthorized', 401);
        const token = beararToken.split(' ')[1];
        if (!token) throw new CustomError('unauthorized', 401);
        jwt.verify(token, 'saikatdutta', async function (err, decoded) {
            try {
                if (err) throw new CustomError(err.message, 401);
                const user = await User.findById(decoded.id);
                req.user = user
                next()
            } catch (error) {
               next(error) 
            }
        });
        
    } catch (error) {
        next(error)
    }
}

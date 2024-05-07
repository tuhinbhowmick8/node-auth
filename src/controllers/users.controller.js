import CustomError from "../customError.js";
import { User } from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createToken = (id)=> {
    return jwt.sign({id}, 'saikatdutta', { expiresIn: '6h' });
}


export const createUser = async (req, res, next)=> {
    try {
        const { name, age, email, password } = req.body;
        if (!name || !age || !email || !password) throw new CustomError('Required field missing', 400);
        const newUser = await User.create({ name, age, email, password });
        if (!newUser) throw new CustomError('Bad request', 400);
        res.status(200).json({ status: 1, message: "Success", data: newUser })
    } catch (error) {
        next(error)
    }
}


export const verifyUser = async (req, res, next)=> {
    try {
        const {email, password } = req.body;
        if (!email || !password) throw new CustomError('Required field missing', 400);
        const isUser = await User.findOne({ email });
        if (!isUser) throw new CustomError('Email & Password Incorrect', 400);
        console.log(password)
        console.log(isUser.password)
        const userPass = await bcrypt.compare(password, isUser.password);
        if (!userPass) throw new CustomError('Email or Password Incorrect', 400);
        const token = createToken(isUser._id);
        res.status(200).json({ status: 1, message: "Success", data: {authToken: token, name: isUser.name} })
    } catch (error) {
        next(error)
    }
}
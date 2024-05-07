import { Router } from 'express';
import CustomError from '../customError.js';
import { User } from '../models/user.js';
import { createUser } from '../controllers/users.controller.js';
const router = Router();

router.get('/', (req, res, next) => {
    res.json({ status: 1, message: "User route" })
});

router.get('/all-users', async(req, res, next) => {
    try {
        
        const { email, age } = req.query;
        const searchquery = {};
        if(email) {
            searchquery.email = email
        } 
        if(age) {
            searchquery.age = age
        }
        // console.log(req.user)
        const allUsers = await User.find(searchquery,{password: 0, __v: 0});
        if(!allUsers) throw new CustomError('Bad request: Users Not Found', 400);
        res.status(200).json({ status: !!allUsers.length ? 1 : 0, message: !!allUsers.length ? "Success" : "No data Found", data: allUsers })
    } catch (error) {
        next(error)
    }
});

router.post('/create', createUser);

router.post('/update-user/:id', async(req, res, next) => {
    try {
        const { name, age } = req.body;
        const id = req.params.id;
        // if(!email) throw new CustomError('Email field missing', 400);
        if (!name || !age) throw new CustomError('Required field missing', 400);
        const isUser = await User.findById(id);
        if (!isUser) throw new CustomError('Invalid User', 400);
        const updateUser = await User.findByIdAndUpdate(isUser._id, {name, age}, {new: true})
        res.status(200).json({ status: 1, message: "Success", data: updateUser })
    } catch (error) {
        next(error)
    }
});

export default router;
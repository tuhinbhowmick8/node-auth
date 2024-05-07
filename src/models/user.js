import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
},{timestamps: true});

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 12);
})

export const User = mongoose.model('user', userSchema);
import mongoose from "mongoose";
// const mongoUrl = "mongodb+srv://adminSaikat:Qwerty1$@cluster0.rg16f.mongodb.net/nodetestApplication";
const mongoUrl = "mongodb://localhost:27017/fornodejs";
 export const connectDb = async ()=> {
    try {
        await mongoose.connect(mongoUrl);
        console.log('Db connected');
    } catch (error) {
        throw error
    }
}
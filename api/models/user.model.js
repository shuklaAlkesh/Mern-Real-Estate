import { Timestamp } from "bson";
import mongoose from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true,
    }
},{timestamp:true });

const User = moongose.model('User',userSchema);

export default User;
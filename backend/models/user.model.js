import mongoose, { model } from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true},
    email: {
        type: String,
        required: true,
        unique: true},
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePic: {
        type: String,
        default: ""
    },   
},
{timestamps: true})

const user =  mongoose.model("users",userSchema)
export default user;
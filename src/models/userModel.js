import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    usename:{
        type:String,
        required:[true,"Please add a username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please add a email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please add a password"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordExpire:Date,
    verifyToken:String,
    verifyTokenExpire:Date 
})

const User=mongoose.models.users||mongoose.model("users",userSchema);
export default User;
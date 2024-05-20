import mongoose from "mongoose";
import User from "../user/userModel";
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomName:{
        type: String,
        required: true,
    },
    deviceId:{
        type: String,
        ref: "User",
        required: true,
        validate : {
            validator : async function (value:string) {
                const user = await User.findOne({deviceId: value});
                return user ? true : false;
            },
            message : "User with Device Id not found",
        },
    },
    spendStart : {
        type: Date,
    },
    spendEnd : {
        type: Date,
    },
    waterSpend:{
        type: Number,
        default: 0,
    },
    roomNo:{
        type: String,
        required: true,
    },
})
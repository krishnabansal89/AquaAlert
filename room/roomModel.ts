import mongoose from "mongoose";
import User from "../user/userModel";
const Schema = mongoose.Schema;

const waterSpendSchema = new Schema({
    amount:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        required: true,
        default: Date.now,
    }
})


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
    waterSpendHistory : [waterSpendSchema]
})

const Room = mongoose.model("Room", roomSchema);
export default Room;
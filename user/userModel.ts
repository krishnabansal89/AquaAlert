import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    deivceId : {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
    ownerId:{
        type: Schema.Types.ObjectId,
        ref: "SuperUser",
    },
    houseNo:{
        type: String,
        required: true,
    },
    });
const User = mongoose.model("User", userSchema);
export default User;
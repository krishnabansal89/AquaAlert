import mongoose from "mongoose";
const Schema = mongoose.Schema;

const superUserSchema = new Schema({
    userId : {
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
    });

const SuperUser = mongoose.model("SuperUser", superUserSchema);
export default SuperUser;
import User from "./userModel";

import jwt from "jsonwebtoken";
import { Request , Response } from "express";
import Room from "../room/roomModel";
const jwtSecret = process.env.JWT_SECRET
const userController = {
    signup: async (req : Request, res : Response) => {
        try {
            const { deviceId , name, email, password, userType, houseNo } = req.body;
            const user = new User({
                deviceId,
                name,
                email,
                password,
                houseNo,
            });
            await user.save();
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send("Data is not Valid");
        }
    },
    login: async (req : Request, res : Response) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email, password });
            
            if(user) {
                res.status(200).send(user);
                const jwtToken :jwt = jwt.sign({ email: user.email, _id: user._id }, jwtSecret );
                res.status(200).json({ jwtToken });
            }}
        catch (error) {
            res.status(400).send("Data is not Valid");
        }
    },
    fetchInfo : async (req:Request , res:Response) => { 
        const id:string = req.body.id as string
        const user:any = await User.findById(id);
        if(!user) return
        const deviceId = user.deviceId
        const rooms = await Room.find({
            deviceId:deviceId
        })
        const data:any = {"UserWaterSpend" : user.waterSpend , "Rooms" : rooms}
        res.status(200).json(data)
            
            
    }
}


export {userController};
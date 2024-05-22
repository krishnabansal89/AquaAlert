import User from "./userModel";
import SuperUser from "./superuserModel";
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
const superUserController = {
    signup: async (req : Request, res : Response) => {
        try {
            const { userId , name, email, password, desc } = req.body;
            const superUser = new SuperUser({
                userId,
                name,
                email,
                password,
                desc,
        
            });
            await superUser.save();
            res.status(200).send(superUser);
        } catch (error) {
            res.status(400).send("Data is not Valid");
        }
    },
    login: async (req : Request, res : Response) => {
        try {
            const { email, password } = req.body;
            const superUser = await SuperUser.findOne({ email, password });
            
            if(superUser) {
                res.status(200).send(superUser);
                const jwtToken :jwt = jwt.sign({ email: superUser.email, _id: superUser._id }, jwtSecret );
                res.status(200).json({ jwtToken });
            }}
        catch (error) {
            res.status(400).send("Data is not Valid");
        }
    },
    getUsers : async (req : Request, res : Response) => {
        const token = req.body.token
        const decoded = jwt.verify(token, jwtSecret);
        const users:any = await SuperUser.find({ ownerId : decoded.id });
        let userData:{houseNo :String , userName :string , waterSpend :number , userId:string };
        let userDatas:any = [];
        users.forEach(user => {
            userData.houseNo = user.houseNo;
            userData.userName = user.name;
            userData.waterSpend = user.waterSpend;
            userData.userId = user.userId;
            userDatas.push(userData);
        });
        return res.status(200).json(userDatas);
    }
}

export {userController , superUserController};
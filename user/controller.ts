import User from "./userModel";
import SuperUser from "./superuserModel";
import jwt from "jsonwebtoken";
import { Request , Response } from "express";
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
    }
}

export {userController , superUserController};
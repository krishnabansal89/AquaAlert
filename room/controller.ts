import { Request, Response } from "express";

import Room from "./roomModel";
import User from "../user/userModel";

const roomController = {
    totalWaterSpend: async (req :Request, res:Response) => {
        try {
            const { deviceId , roomName } = req.body;
            const room = await Room.findOne({ deviceId , roomName});
            let total = 0;
            if (room) {
                total = room.waterSpend;
            }
            res.status(200).send({ total });
        } catch (error) {
            res.status(400).send("Data is not Valid");
        }},
    startSpend: async (req:Request , res:Response) => {
        try {
            const { deviceId, roomName } = req.body;
            const room = await Room.findOne({ deviceId , roomName });
            const currentDate = new Date();
            if (room) {
                room.spendStart = currentDate;
                await room.save();
            }
            res.status(200).send("Started the record");
        }catch(error) {
            res.status(400).send("Data is not Valid");
        }
    },
    stopSpend: async (req:Request , res:Response) => {
        try {
            const { deviceId, roomName } = req.body;
            const room = await Room.findOne({ deviceId , roomName });
            const currentDate = new Date();
            if (room) {
                room.spendEnd = currentDate;
                if(room.spendStart) {
                    room.waterSpend = (room.spendEnd.getTime() - room.spendStart.getTime()) / 1000;
                    room.waterSpendHistory.push({ amount: room.waterSpend, date: currentDate });
                }
                else room.waterSpend = 0;
                await room.save();
            }
        }catch(error) {
            res.status(400).send("Data is not Valid");
        }},
    spendHistory: async (req:Request , res:Response) => {
        try {
            const { deviceId, roomName } = req.body;
            const room = await Room.findOne({ deviceId , roomName });
            let history :any = [];
            if (room) {
                history = room.waterSpendHistory;
            }
            res.status(200).send({ history });
        }catch(error) {
            res.status(400).send("Data is not Valid");
        }}

        
    }
export default roomController;
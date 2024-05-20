import { Router } from "express";
import roomController from "./controller";

const roomRouter = Router();
roomRouter
    .get('/room/totalWaterSpend', roomController.totalWaterSpend)
    .post('/room/startSpend', roomController.startSpend)
    .post('/room/stopSpend', roomController.stopSpend);
    
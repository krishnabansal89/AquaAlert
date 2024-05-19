import express , { Router } from 'express';
import userRounter from './user/userRouter'; 

const router : Router = express.Router();

router.use('/user',userRounter);


export default router;

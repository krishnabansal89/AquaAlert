import express , {Router} from 'express';
import { Request, Response } from 'express';
import { userController  } from './controller';
const userRounter :Router = express.Router();

userRounter
    .post('/user/signup', userController.signup)
    .post('/user/login', userController.login);

export default userRounter;
import express , {Router} from 'express';
import { Request, Response } from 'express';
import { userController , superUserController } from './controller';
const userRounter :Router = express.Router();

userRounter
    .post('/user/signup', userController.signup)
    .post('/user/login', userController.login)
    .post('/superuser/signup', superUserController.signup)
    .post('/superuser/login', superUserController.login);

export default userRounter;
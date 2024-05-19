import express , {Router} from 'express';

const userRounter :Router = express.Router();

userRounter.get('/user', (req, res) => {
    res.send('User Router');
});


export default userRounter;
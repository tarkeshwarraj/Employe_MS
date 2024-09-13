import express from 'express';
import {registerUser, loginUser, updateUser, getUser} from "../controllers/userController.js";
import authMiddleware from '../middleware/roleMiddleware.js'

const userRouter = express.Router();

//Route to handle user registration
userRouter.post('/register', registerUser);

//Route to handle user login1
userRouter.post('/login', async(req,res) =>{
    await loginUser(req,res)  //Normal login with is Admin defaulting to false
}); 

//GET user data and UPDATE it 

userRouter.get('/all', authMiddleware, getUser);
userRouter.put('/update', authMiddleware, updateUser );//Normal login with is Admin defaulting to false

export default userRouter;



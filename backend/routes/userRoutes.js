import express from 'express';
import {registerUser, loginUser} from "../controllers/userController.js";

const userRouter = express.Router();

//Route to handle user registration
userRouter.post('/register', registerUser);

//Route to handle user login1
userRouter.post('/login', async(req,res) =>{
    await loginUser(req,res)  //Normal login with is Admin defaulting to false
}); 

export default userRouter;



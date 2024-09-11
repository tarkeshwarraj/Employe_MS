import express from 'express';
import { loginUser } from '../controllers/userController.js';


const adminRouter = express.Router();

adminRouter.post('/login', (req,res) => loginUser(req, res, true)); //pass an extra parameter to indicate admin login. By default the admin value is false in login user controller

export default adminRouter;
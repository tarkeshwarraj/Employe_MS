import express from 'express';
import authMiddleware from '../middleware/roleMiddleware.js'
import { getMonthlyAttendance, markAttendance, checkAttendance } from '../controllers/attendanceController.js';

const attendanceRouter = express.Router();

//POST route for marking attendance
attendanceRouter.post('/mark',authMiddleware, markAttendance);

//GET route to get monthly attendance
attendanceRouter.get('/get/:year/:month',authMiddleware, getMonthlyAttendance);

//GET Attendance Check
attendanceRouter.get('/check', authMiddleware, checkAttendance)


export default attendanceRouter;
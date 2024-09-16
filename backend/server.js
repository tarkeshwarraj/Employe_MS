import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js' 
import attendanceRouter from './routes/attendanceRoute.js' 
import 'dotenv/config'



//Server Start
const app = express();
const PORT = process.env.PORT || 3000;

//Connect to Database
connectDB();

//cors for same Origan
app.use(cors());

//Middleware to parse JSON bodies
app.use(express.json()); //Express.js के नए वर्शन में, body-parser का कार्य express.json() और express.urlencoded() द्वारा किया जाता है।

//Server static files
app.use('/uploads', express.static('uploads'));

//////Now Start Making Api//////

//Home page
app.get("/", (req, res) =>{
  res.send("API Working");
});


app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.use('/api/attendance', attendanceRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import Attendance from '../models/attendanceModel.js';

//Mark Attendance for a Specific Day
export const markAttendance = async (req, res) => {
    const {userId} = req.body;
    const {year, month, day, status } = req.body;

    try{
        //Find attendance record for the month or crate a new one
        let attendance = await Attendance.findOne({userId, year, month});

        if(!attendance){
            //Create new attendance record for the month if not found
            attendance = new Attendance({
                userId,
                year,
                month,
                attendance: {}, //Initialize empty object for days
            });
        }

        //Update attendance for the specific day
        attendance.attendance.set(day, status); //e.g. attendance.set ("01", "present")

        await attendance.save();
        res.status(200).json({message: 'Attendance marked successfully'});

    }catch(error){
        res.status(500).json({error: 'Error making attendance'});
    };
};


    //Get Monthly Attendance for a User
    export const getMonthlyAttendance = async (req, res) => {
        const {userId} = req.body;
        const { year, month } = req.params;
        try{
            const attendance = await Attendance.findOne({userId, year, month});
            if(!attendance) {
                return res.status(404).json({message: 'Attendance not found'});
            }
            res.status(200).json(attendance);
        }catch(error) {
            res.status(500).json({error: 'Error fetching attendance'});
        }
    }

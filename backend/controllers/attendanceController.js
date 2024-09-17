import Attendance from "../models/attendanceModel.js";

//Mark Attendance for a Specific Day
export const markAttendance = async (req, res) => {
  const { userId } = req.body;
  const { year, month, day, status } = req.body;

  try {
    // Ensure day is a number and convert it to string
    const dayString = String(parseInt(day, 10));
    if (
      isNaN(dayString) ||
      parseInt(dayString, 10) < 1 ||
      parseInt(dayString, 10) > 31
    ) {
      return res.status(400).json({ message: "Invalid day" });
    }

    //Find attendance record for the month or crate a new one
    let attendance = await Attendance.findOne({ userId, year, month });

    if (!attendance) {
      //Create new attendance record for the month if not found
      attendance = new Attendance({
        userId,
        year,
        month,
        attendance: { [dayString]: status }, //Initialize empty object for days
      });
    } else {
      //Update attendance for the specific day
      attendance.attendance.set(dayString, status); //e.g. attendance.set ("01", "present")
    }

    await attendance.save();
    res.status(200).json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ error: "Error making attendance" });
  }
};

//Attendance Marked
export const checkAttendance = async (req, res) => {
  
  const { userId } = req.body;
  try{

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    
    const attendance = await Attendance.findOne({ userId, year, month});
    
    if (attendance && attendance.attendance.has(String(new Date().getDate()))){
      res.json({attendanceMarked: true});
    }else{
      res.json({attendanceMarked: false});
    }
  }catch(error){
    console.log("Error checking attendance:", error);
    res.status(500).json({message: 'Error checking attendance'});
  }

};

// Get Monthly Attendance for a User
export const getMonthlyAttendance = async (req, res) => {
  const { userId } = req.body; // Extract userId from the request body
  const { year, month } = req.params; // Extract year and month from params

  // Check if required fields are provided
  if (!userId || !year || !month) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // Fetch the attendance for the specified user, year, and month
    const attendance = await Attendance.findOne({ userId, year, month });

    if (!attendance) {
      return res.status(200).json({
        attendance:{}, //Empty attendance data for the given month
        message: "Attendance not found",
      });
    }

    // Send back attendance data
    res.status(200).json({
      userId: attendance.userId,
      year: attendance.year,
      month: attendance.month,
      attendance: attendance.attendance, // Returning only the attendance details
    });

  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Error fetching attendance" });
  }
};

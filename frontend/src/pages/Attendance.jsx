import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { useStoreContext } from '../StoreContext/StoreContext';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState({});
  const [message, setMessage] = useState('');
  const { url, token } = useStoreContext();
  
  // Track the active year and month being viewed in the calendar
  const [activeDate, setActiveDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1 // JS months are 0-indexed, so +1
  });

  // Fetch attendance data whenever active year or month changes
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const { year, month } = activeDate;
        const response = await axios.get(`${url}/api/attendance/get/${year}/${month}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming response.data contains the attendance object for the month
        setAttendanceData(response.data.attendance || {});
        setMessage(response.data.message); //Set the returned message
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, [url, token, activeDate]);

  // Function to handle changes in the calendar's active view (month or year change)
  const handleActiveDateChange = ({ activeStartDate }) => {
    const newYear = activeStartDate.getFullYear();
    const newMonth = activeStartDate.getMonth() + 1; // JS months are 0-indexed, so +1
    setActiveDate({ year: newYear, month: newMonth });
  };

  // Function to customize the calendar tile (date box) content
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const day = date.getDate();
      const status = attendanceData[day]; // Get status for that day

      if (status) {
        return (
          <div className={`w-6 h-6 rounded-full text-center ${status === 'present' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {status === 'present' ? '✔' : '✖'}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="attendance-container p-8 bg-gradient-to-r from-indigo-400 via-purple-500 min-h-screen overflow-x-hidden">
      <h2 className="text-3xl font-extrabold text-white text-center mb-8">Attendance History</h2>

      <div className="bg-white shadow-lg rounded-lg p-1 sm:p-8 max-w-4xl mx-auto">
        <Calendar
        tileContent={tileContent} //Function to customize each til's content
        className="mx-auto text-lg border-none" //center the calender
        onActiveStartDateChange={handleActiveDateChange} //Detect changes in month/year view
        tileClassName="hover:bg-purple-300" //Hover effect on dates
        />
        {message && (
          <h5 className="text-red-500 text-center pt-4">{message}</h5>
        )}
      </div>
    </div>
  );
};

export default Attendance;

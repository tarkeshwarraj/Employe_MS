import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStoreContext } from "../StoreContext/StoreContext";
import { FcApproval } from "react-icons/fc";

const Dashboard = () => {
  const navigate = useNavigate();
  const { url, setToken, token, attendanceMarked, setAttendanceMarked } =
    useStoreContext();

  // Set the token from localStorage when the component mounts
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
  }, [setToken]);

  //Get current year , month, and day
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1; //Js Months are 0-indexed, so add 1
  const day = new Date().getDate(); //Current day

  const updatedData = {
    year,
    month,
    day,
    status: "present",
  };

  const handlePresent = async () => {
    try {
      const response = await axios.post(
        `${url}/api/attendance/mark`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update attendance state to true after successful marking
      setAttendanceMarked(true);
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  return (
    <div className="px-6 sm:px-20 myColor">
      <div className="flex justify-between">
        <p>
          <span className="text-2xl">Hi</span> Arman
        </p>
        {!attendanceMarked ? (
          <button
            onClick={handlePresent}
            className="bg-lime-400 text-black px-2 py-1.5 rounded-sm hover:scale-105 transition-none"
          >
            I am present
          </button>
        ) : (
          <div className="flex">
            <p className="sm:px-1 text-end">Attendance Marked</p> <FcApproval />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

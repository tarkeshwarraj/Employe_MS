import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStoreContext } from "../StoreContext/StoreContext";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    fieldOfStudy: "",
    experience: "",
    age: "",
    gender: "",
    qualification: "",
    jobCategory: "",
    address: "",
    pinCode: "",
    salaryRange: "",
    employeeId: "",
    dateOfBirth: "",
    nationalId: "",
    dependents: "",
  });

  const { url } = useStoreContext(); // Using StoreContext to get API URL
  const token = localStorage.getItem("token");

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${url}/api/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authorization
        },
      });

      if (response.data.success) {
        setFormData(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Update user data
  const updateUserData = async () => {
    try {
      const updatedData = {
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        address: formData.address,
        fieldOfStudy: formData.fieldOfStudy,
        experience: formData.experience,
        age: formData.age,
        jobCategory: formData.jobCategory,
        mobileNumber: formData.mobileNumber,
        qualification: formData.qualification,
        pinCode: formData.pinCode,
      };
  
      console.log(updatedData);

  
      const response = await axios.put(`${url}/api/user/update`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.success) {
        alert("User Updated Successfully");
      } else {
        console.error("Update failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  
  

  useEffect(() => {
    fetchUserData();
  }, [url]);

  return (
    <div className="flex flex-row justify-center overflow-x-hidden">
      <div className="border grow-1 shrink-1 basis-10/12 md:basis-8/12 border-orange-50 md:p-4 p-5 md:p-10 m-6 sm:m-10">
        <div className="box">
          <h2 className=" myColor text-center pb-5">User Profile</h2>

          <div className="w-full h-full flex gap-3 mb-3 md:mb-6 justify-center">
            <img
              src="/assets/img.jpg"
              alt="Image"
              className="myColor images w-24 h-24 md:w-32 md:h-32 border border-red-100 rounded-full object-cover"
            />
          </div>

          <div className="flex gap-3 pb-3 md:pb-6">
            <input
              className="py-1.5 px-3.5 md:mx-4 w-full rounded-md"
              type="text"
              value={formData.name}
              name="name"
              placeholder="Full Name"
              onChange={handleInputChange}
            />
            <input
              className="py-1.5 px-3.5 md:mx-4 w-full rounded-md"
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              placeholder="Mobile Number"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-3 pb-3 md:pb-6">
            <input
              className="py-1.5 px-3.5 md:mx-4 w-full rounded-md text-black"
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleInputChange}
            />
            <input
              className="py-1.5 px-3.5 md:mx-4 w-full rounded-md text-black"
              type="text"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              placeholder="Field Of Study"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-row gap-3 pr-3.5 pb-3 md:pb-6">
            <input
              className="md:mx-4 w-full py-1.5 px-3.5 rounded-md text-black"
              type="text"
              name="experience"
              value={formData.experience}
              placeholder="Experience"
              onChange={handleInputChange}
            />
            <select
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="py-1.5 px-3.5 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
            >
              <option value="">Select Age</option>
              {[...Array(100).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="py-1.5 px-3.5 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="flex gap-3 pb-3 md:pb-6">
            <input
              className="py-1.5 px-3.5 md:mx-4 w-full rounded-md text-black"
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              placeholder="Qualification"
            />
            <input
              className="py-1.5 px-3.5 md:mx-4 w-full rounded-md text-black"
              type="text"
              name="jobCategory"
              value={formData.jobCategory}
              onChange={handleInputChange}
              placeholder="Job Category"
            />
          </div>

          <div className="flex gap-3 pb-3 md:pb-6">
            <input
              className="py-1.5 px-3.5 md:mx-4 w-full rounded-md text-black"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
            <input
              className="py-1.5 px-3.5 md:mx-4 w-full rounded-md text-black"
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleInputChange}
              placeholder="Pin Code"
            />
          </div>

          <div className="flex justify-center gap-3 pb-3 md:pb-6 ">
            <button
              onClick={updateUserData}
              className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

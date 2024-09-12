import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Applicant User', 'Manager', 'Finance Manager', 'Admin', 'Employee'], // 'employee' role added
        required: true,
        default: 'Applicant User',
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // User Profile Details
    address: { // Added address field
        type: String,
        default: '', // Default to an empty string or set to null based on your requirements
    },
    pinCode: {
        type: String,
        required: false,
    },
    mobileNumber: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    fieldOfStudy: {
        type: String,
        required: false,
    },
    qualification: {
        type: String,
        required: false,
    },
    experience: {
        type: String,
        required: false,
    },
    jobCategory: {
        type: String,
        required: false,
    },
    salaryRange: {
        type: String,
        required: false,
    },
    // Employee-Specific Details (only for 'employee' role)
    employeeId: {
        type: String,
        required: false,
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },
    nationalId: {
        type: String,
        required: false,
    },
    dependents: {
        type: Number,
        required: false,
    },
},{ minimize: false });

export default mongoose.model('user', userSchema);

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
    role:{
        type: String,
        enum: ['user', 'manager', 'finance_manager', 'admin'], //Use an enum validator to ensure that only the allowed roles can be assigned.
        required: true,
        default: 'user',
    },
    lastLogin:{
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

},{minimize: false});

export default mongoose.model('user', userSchema);
import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    month: {
        type:Number, //1-12 representing the month
        required: true,
    },
    attendance: {
        type: Map,
        of: String, //present/absent
        required: true,
    },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
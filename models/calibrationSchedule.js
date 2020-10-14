const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calibrationScheduleSchema = new Schema({
    // foreign keys
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    asset: {
        type: Schema.Types.ObjectId,
        ref: "Asset",
    },
    calibrationRecords: [{
        type: Schema.Types.ObjectId,
        ref: "CalibrationRecord"
    }],
    // description of the calibration
    description: {
        type: String,
        required: true
    },
    // maximum calibration interval in months
    maxCalInterval: {
        type: Number,
        required: true
    },
    // current calibration interval in months
    currentCalInterval: {
        type: Number,
        required: true
    },
    // spec document for calibration procedures
    calpDoc: {
        type: String
    },
    // spec where limits are listed
    specDoc: {
        type: String
    },
    // date of last calibration
    lastDate: {
        type: Date,
        required: true
    },
    // date next calibration is due
    dueDate: {
        type: Date,
        required: true
    },
    // user notes
    note: {
        type: String,
    },
    // calibration is active
    isActive: {
        type: Boolean,
        default: true
    },
    // calibration is currently extended
    isExtended: {
        type: Boolean,
        default: false
    }
});

const CalibrationSchedule = mongoose.model("CalibrationSchedule", calibrationScheduleSchema);
module.exports = CalibrationSchedule;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calibrationRecordSchema = new Schema({
    // foreign keys
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: "A user must be assigned to the calibration record."
    },
    asset: {
        type: Schema.Types.ObjectId,
        ref: "Asset",
        required: "An asset must be assigned to the calibration record."
    },
    calibrationSchedule: {
        type: Schema.Types.ObjectId,
        ref: "CalibrationSchedule",
        required: "A calibration schedule must be assigned to the calibration record."
    },
    // date of calibration
    date: {
        type: Date,
        required: "The date of the calibration record is required."
    },
    // as found, in tolerance, damaged, or out of tolerance
    conditionReceived: {
        type: String,
    },
    // failure mode, if applicable
    failureMode: {
        type: String
    },
    // as left, in tolerance or limited use
    conditionReturned: {
        type: String,
    },
    // whether or not the cal was considered a failure for extension purposes
    calibrationFailure: {
        type: Boolean,
    },
    // user note
    note: {
        type: String
    }
});

const CalibrationRecord = mongoose.model("CalibrationRecord", calibrationRecordSchema);
module.exports = CalibrationRecord;
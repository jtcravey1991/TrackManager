const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const maintenanceRecordSchema = new Schema({
    // foreign keys
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    asset: {
        type: Schema.Types.ObjectId,
        ref: "Asset",
        required: true
    },
    maintenanceSchedule: {
        type: Schema.Types.ObjectId,
        ref: "MaintenanceSchedule",
        required: true
    },
    // date PM was performed
    date: {
        type: Date,
        required: true
    },
    // user note
    note: {
        type: String
    }
});

const MaintenanceRecord = mongoose.model("MaintenanceRecord", maintenanceRecordSchema);
module.exports = MaintenanceRecord;
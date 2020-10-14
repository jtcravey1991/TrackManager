const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const maintenanceScheduleSchema = new Schema({
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
    maintenanceRecords: [{
        type: Schema.Types.ObjectId,
        ref: "MaintenanceRecord"
    }],
    // description of the maintenance
    description: {
        type: String,
        required: true
    },
    // Schedule interval, in days
    pmInterval: {
        type: Number,
        required: true
    },
    // technician assigned to perform PM
    assignedTech: {
        type: String,
        required: true
    },
    // related documentation
    pmDoc: {
        type: String,
        required: true
    },
    // date of last PM
    lastDate: {
        type: Date,
        required: true
    },
    // date of next PM
    dueDate: {
        type: Date,
        required: true
    },
    // user notes
    note: {
        type: String,
    },
    // PM is active
    isActive: {
        type: Boolean,
        default: true
    }
});

const MaintenanceSchedule = mongoose.model("MaintenanceSchedule", maintenanceScheduleSchema);
module.exports = MaintenanceSchedule;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetSchema = new Schema({
    // gen purpose/manager plus asset ID
    assetId: {
        type: String
    },
    // Asset ID used for calibration tracking
    calibrationAssetId: {
        type: String
    },
    // asset Id for external cal lab (if applicable)
    externalCalibrationAssetId: {
        type: String
    },
    // Asset ID used in finance
    financialAssetId: {
        type: String
    },
    // Asset ID used in Avante
    avanteAssetId: {
        type: String
    },
    // assets ID in the product matrix
    productMatrixAssetId: {
        type: String
    },
    // asset ID in the equipment responsibilities spreadsheet
    equipmentResponsibilitiesAssetId: {
        type: String,
    },
    // asset Id used in the MDIL database
    mdilAssetId: {
        type: String
    },
    // Brief description of the equipment
    description: {
        type: String,
    },
    // Location of the equipment
    location: {
        type: String,
    },
    // The equipment's manufacturer
    manufacturer: {
        type: String,
    },
    // The equipments given model number
    modelNumber: {
        type: String
    },
    // The equipments serial number
    serialNumber: {
        type: String
    },
    // user notes
    note: {
        type: String
    },
    // status active/inactive
    isActive: {
        type: Boolean,
        default: true
    },
    // foreign keys
    calibrationSchedules: {
        type: Schema.Types.ObjectId,
        ref: "CalibrationSchedule"
    },
    calibrationRecords: {
        type: Schema.Types.ObjectId,
        ref: "CalibrationRecord"
    },
    maintenanceSchedules: {
        type: Schema.Types.ObjectId,
        ref: "MaintenanceSchedule"
    },
    maintenanceRecords: {
        type: Schema.Types.ObjectId,
        ref: "MaintenanceRecords"
    },
    equipmentNotes: {
        type: Schema.Types.ObjectId,
        ref: "EquipmentNote"
    },
    repairRecords: {
        type: Schema.Types.ObjectId,
        ref: "RepairRecord"
    }
});

const Asset = mongoose.model("Asset", assetSchema);
module.exports = Asset;
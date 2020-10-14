const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const passport = require("passport");

const UserSchema = new Schema({
    // login info
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: [({ length }) => length >= 6, "Password should be longer."] 
    },
    // user info
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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

// passport methods
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.pre("save", function (next) {
    if (this.isNew) {
        this.password = bcrypt.hashSync(
            this.password,
            bcrypt.genSaltSync(10),
            null
        );
        next();
    } else {
        next();
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
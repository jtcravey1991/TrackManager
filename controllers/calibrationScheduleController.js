const db = require("../models");

module.exports = {
    // returns all calibration schedules
    findAll: function (req, res) {
        db.CalibrationSchedule.find({})
        .populate("user")
        .populate("asset")
        .populate("calibrationRecords")
        .then(dbCalibrationSchedules => res.json(dbCalibrationSchedules))
        .catch(err => res.status(500).json(err));
    },
    // returns a single calibration schedule by id
    findOne: function (req, res) {
        db.CalibrationSchedule.findById(req.params.id)
        .populate("user")
        .populate("asset")
        .populate("calibrationRecords")
        .then(dbCalibrationSchedule => res.json(dbCalibrationSchedule))
        .catch(err => res.status(500).json(err));
    },
    // returns all calibration schedules assiged to the currently logged in user
    findByCurrentUser: function (req, res) {
        db.CalibrationSchedule.find({ user: req.user._id })
        .populate("user")
        .populate("asset")
        .populate("calibrationRecords")
        .then(dbCalibrationSchedules => res.json(dbCalibrationSchedules))
        .catch(err => res.status(500).json(err));
    },
    // returns all calibration schedules assigned to a user by id
    findByUser: function (req, res) {
        db.CalibrationSchedule.find({ user: req.params.id })
        .populate("user")
        .populate("asset")
        .populate("calibrationRecords")
        .then(dbCalibrationSchedules => res.json(dbCalibrationSchedules))
        .catch(err => res.status(500).json(err));
    },
    // returns all calibration schedules assigned to an asset by id
    findByAsset: function (req, res) {
        db.CalibrationSchedule.find({ asset: req.params.id })
        .populate("user")
        .populate("asset")
        .populate("calibrationRecords")
        .then(dbCalibrationSchedules => res.json(dbCalibrationSchedules))
        .catch(err => res.status(500).json(err));
    },
    // returns all past due calibration schedules
    findPastDue: function (req, res) {
        db.CalibrationSchedule.find({ dueDate: { $lte: Date.now() }})
        .populate("user")
        .populate("asset")
        .populate("calibrationRecords")
        .then(dbCalibrationSchedules => res.json(dbCalibrationSchedules))
        .catch(err => res.status(500).json(err));
    },
    // returns all past due calibration schedules assigned to the currently logged in user
    findPastDueByCurrentUser: function (req, res) {
        db.CalibrationSchedule.find({ dueDate: { $lte: Date.now() }, user: req.user._id })
        .populate("user")
        .populate("asset")
        .populate("calibrationRecords")
        .then(dbCalibrationSchedules => res.json(dbCalibrationSchedules))
        .catch(err => res.status(500).json(err));
    },
    // returns all past due calibration schedules assigned to a user by id
    findPastDueByUser: function (req, res) {
        db.CalibrationSchedule.find({ dueDate: { $lte: Date.now() }, user: req.params.id })
        .populate("user")
        .populate("asset")
        .populate("calibrationRecords")
        .then(dbCalibrationSchedules => res.json(dbCalibrationSchedules))
        .catch(err => res.status(500).json(err));
    },
    // creates a calibration schedule
    create: function (req, res) {
        db.CalibrationSchedule.create(req.body)
        .then(async (dbCalibrationSchedule) => {
            await db.User.findByIdAndUpdate(dbCalibrationSchedule.user, { $push: { calibrationSchedules: dbCalibrationSchedule._id }});
            await db.Asset.findByIdAndUpdate(dbCalibrationSchedule.asset, { $push: { calibrationSchedules: dbCalibrationSchedule._id }});
            return res.json(dbCalibrationSchedule);
        })
        .catch(err => res.status(500).json(err));
    },
    // updates a calibration schedule by id
    update: function (req, res) {
        db.CalibrationSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(dbCalibrationSchedule => res.json(dbCalibrationSchedule))
        .catch(err => res.status(500).json(err));
    },
    // deletes a calibration schedule by id and any records assigned to it
    delete: function (req, res) {
        db.CalibrationSchedule.findByIdAndDelete(req.params.id)
        .then(async (dbCalibrationSchedule) => {
            await db.User.findByIdAndUpdate(dbCalibrationSchedule.user, { $pull: { calibrationSchedules: dbCalibrationSchedule._id }});
            await db.Asset.findByIdAndUpdate(dbCalibrationSchedule.asset, { $pull: { calibrationSchedules: dbCalibrationSchedule._id }});
            await db.CalibrationRecord.deleteMany({ calibrationSchedule: dbCalibrationSchedule._id });
            return res.json(dbCalibrationSchedule);
        })
        .catch(err => res.status(500).json(err));
    }
}
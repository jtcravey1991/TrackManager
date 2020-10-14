const db = require("../models");

module.exports = {
    // returns all calibration records
    findAll: function (req, res) {
        db.CalibrationRecord.find({})
        .populate("user")
        .populate("asset")
        .populate("calibrationSchedule")
        .then(dbCalibrationRecords => res.json(dbCalibrationRecords))
        .catch(err => res.status(500).json(err));
    },
    // returns a single calibration record by id
    findOne: function (req, res) {
        db.CalibrationRecord.findById(req.params.id)
        .populate("user")
        .populate("asset")
        .populate("calibrationSchedule")
        .then(dbCalibrationRecords => res.json(dbCalibrationRecords))
        .catch(err => res.status(500).json(err));
    },
    // returns all calibration records assigned to the signed in user
    findByCurrentUser: function (req, res) {
        db.CalibrationRecord.find({ user: req.user._id })
        .populate("user")
        .populate("asset")
        .populate("calibrationSchedule")
        .then(dbCalibrationRecords => res.json(dbCalibrationRecords))
        .catch(err => res.status(500).json(err));
    },
    // returns all calibration records assigned to a specific user by id
    findByUser: function (req, res) {
        db.CalibrationRecord.find({ user: req.params.id })
        .populate("user")
        .populate("asset")
        .populate("calibrationSchedule")
        .then(dbCalibrationRecords => res.json(dbCalibrationRecords))
        .catch(err => res.status(500).json(err));
    },
    // returns all calibration records assigned to an asset by id
    findByAsset: function (req, res) {
        db.CalibrationRecord.find({ asset: req.params.id })
        .populate("user")
        .populate("asset")
        .populate("calibrationSchedule")
        .then(dbCalibrationRecords => res.json(dbCalibrationRecords))
        .catch(err => res.status(500).json(err));
    },
    //returns all calibration records assigned to a schedule by id
    findBySchedule: function (req, res) {
        db.CalibrationRecord.find({ calibrationSchedule: req.params.id })
        .populate("user")
        .populate("asset")
        .populate("calibrationSchedule")
        .then(dbCalibrationRecords => res.json(dbCalibrationRecords))
        .catch(err => res.status(500).json(err));
    },
    // creates a calibration record
    create: function (req, res) {
        db.CalibrationRecord.create(req.body)
        .then(async (dbCalibrationRecord) => {
            await db.User.findByIdAndUpdate(dbCalibrationRecord.user, { $push: { calibrationRecords: dbCalibrationRecord._id }});
            await db.Asset.findByIdAndUpdate(dbCalibrationRecord.asset, { $push: { calibrationRecords: dbCalibrationRecord._id }});
            await db.CalibrationSchedule.findByIdAndUpdate(dbCalibrationRecord.calibrationSchedule, { $push: { calibrationRecords: dbCalibrationRecord._id }});
            return res.json(dbCalibrationRecord);
        })
        .catch(err => res.status(500).json(err));
    },
    // updates a calibration record
    update: function (req, res) {
        db.CalibrationRecord.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(dbCalibrationRecord => res.json(dbCalibrationRecord))
        .catch(err => res.status(500).json(err));
    },
    //deletes a calibration record and removes its id from its user, asset and schedule
    delete: function (req, res) {
        db.CalibrationRecord.findByIdAndDelete(req.params.id)
        .then(async (dbCalibrationRecord) => {
            await db.User.findByIdAndUpdate(dbCalibrationRecord.user, { $pull: { calibrationRecords: dbCalibrationRecord._id }});
            await db.Asset.findByIdAndUpdate(dbCalibrationRecord.asset, { $pull: { calibrationRecords: dbCalibrationRecord._id }});
            await db.CalibrationSchedule.findByIdAndUpdate(dbCalibrationRecord.calibrationSchedule, { $pull: { calibrationRecords: dbCalibrationRecord._id }});
            return res.json(dbCalibrationRecord);
        })
        .catch(err => res.status(500).json(err));
    }
}
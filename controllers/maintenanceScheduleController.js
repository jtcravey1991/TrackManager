const db = require("../models");

module.exports = {
    // returns all maintenance schedules
    findAll: function (req, res) {
        db.MaintenanceSchedule.find({})
        .populate("user")
        .populate("asset")
        .populate("maintenanceRecords")
        .then(dbMaintenanceSchedules => res.json(dbMaintenanceSchedules))
        .catch(err => res.status(500).json(err));
    },
    // returns a single maintenance schedule by id
    findOne: function (req, res) {
        db.MaintenanceSchedule.findById(req.params.id)
        .populate("user")
        .populate("asset")
        .populate("maintenanceRecords")
        .then(dbMaintenanceSchedule => res.json(dbMaintenanceSchedule))
        .catch(err => res.status(500).json(err));
    },
    // returns all maintenance scheudles assigned to the current user
    findByCurrentUser: function (req, res) {
        db.MaintenanceSchedule.find({ user: req.user._id })
        .populate("user")
        .populate("asset")
        .populate("maintenanceRecords")
        .then(dbMaintenanceSchedules => res.json(dbMaintenanceSchedules))
        .catch(err => res.status(500).json(err));
    },
    // returns all maintenance schedules assigned to a user by id
    findByUser: function (req, res) {
        db.MaintenanceSchedule.find({ user: req.params.id })
        .populate("user")
        .populate("asset")
        .populate("maintenanceRecords")
        .then(dbMaintenanceSchedules => res.json(dbMaintenanceSchedules))
        .catch(err => res.status(500).json(err));
    },
    // returns all maintenance schedules assigned to an asset by id
    findByAsset: function (req, res) {
        db.MaintenanceSchedule.find({ asset: req.params.id })
        .populate("user")
        .populate("asset")
        .populate("maintenanceRecords")
        .then(dbMaintenanceSchedules => res.json(dbMaintenanceSchedules))
        .catch(err => res.status(500).json(err));
    },
    // returns all past due maintenance schedules
    findPastDue: function (req, res) {
        db.MaintenanceSchedule.find({ dueDate: { $lte: Date.now() }})
        .populate("user")
        .populate("asset")
        .populate("maintenanceRecords")
        .then(dbMaintenanceSchedules => res.json(dbMaintenanceSchedules))
        .catch(err => res.status(500).json(err));
    },
    // returns all past due maintenance schedules assigned to the current user
    findPastDueByCurrentUser: function (req, res) {
        db.MaintenanceSchedule.find({ dueDate: { $lte: Date.now() }, user: req.user._id })
        .populate("user")
        .populate("asset")
        .populate("maintenanceRecords")
        .then(dbMaintenanceSchedules => res.json(dbMaintenanceSchedules))
        .catch(err => res.status(500).json(err));
    },
    // returns all past due maintenance schedules assigned to a user by id
    findPastDueByUser: function (req, res) {
        db.MaintenanceSchedule.find({ dueDate: { $lte: Date.now() }, user: req.params.id })
        .populate("user")
        .populate("asset")
        .populate("maintenanceRecords")
        .then(dbMaintenanceSchedules => res.json(dbMaintenanceSchedules))
        .catch(err => res.status(500).json(err));
    },
    // creates a maintenance schedule
    create: function(req, res) {
        db.MaintenanceSchedule.create(req.body)
        .then(async (dbMaintenanceSchedule) => {
            await db.User.findByIdAndUpdate(dbMaintenanceSchedule.user, { $push: { maintenanceSchedules: dbMaintenanceSchedule._id }});
            await db.Asset.findByIdAndUpdate(dbMaintenanceSchedule.asset, { $push: { maintenanceSchedules: dbMaintenanceSchedule._id }});
            return res.json(dbCalibrationSchedule);
        })
        .catch(err => res.status(500).json(err));
    },
    // updates a maintenance schedule by id
    update: function(req, res) {
        db.MaintenanceSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(dbCalibrationSchedule => res.json(dbCalibrationSchedule))
        .catch(err => res.status(500).json(err));
    },
    // deletes a maintenance schedule and all maintenance records assigned to it
    delete: function(req, res) {
        db.MaintenanceSchedule.findByIdAndDelete(req.params.id)
        .then(async (dbMaintenanceSchedule) => {
            await db.User.findByIdAndUpdate(dbMaintenanceSchedule.user, { $pull: { maintenanceScheuldes: dbMaintenanceSchedule._id }});
            await db.Asset.findByIdAndUpdate(dbMaintenanceSchedule.asset, { $pull: { maintenanceScheuldes: dbMaintenanceSchedule._id }});
            await db.MaintenanceRecord.deleteMany({ maintenanceSchedule: dbMaintenanceSchedule._id });
            return res.json(dbMaintenanceSchedule);
        })
    }
}
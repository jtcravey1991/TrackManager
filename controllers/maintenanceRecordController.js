const db = require("../models");

module.exports = {
    // returns all maintenance records
    findAll: function (req, res) {
        db.MaintenanceRecord.find({})
        .populate("user")
        .populate("asset")
        .populate("maintenanceSchedule")
        .then(dbMaintenanceRecords => res.json(dbMaintenanceRecords))
        .catch(err => res.status(500).json(err));
    },
    // returns a single maintenance record by id
    findOne: function(req, res) {
        db.MaintenanceRecord.findById(req.params.id)
        .populate("user")
        .populate("asset")
        .populate("maintenanceSchedule")
        .then(dbMaintenanceRecord => res.json(dbMaintenanceRecord))
        .catch(err => res.status(500).json(err));
    },
    // returns all maintenance records assigned to the currently signed in user
    findByCurrentUser: function (req, res) {
        db.MaintenanceRecord.find({ user: req.user._id })
        .populate("user")
        .populate("asset")
        .populate("maintenanceSchedule")
        .then(dbMaintenanceRecords => res.json(dbMaintenanceRecords))
        .catch(err => res.status(500).json(err));
    },
    // returns all maintenance records assigned to a user by id
    findByUser: function (req, res) {
        db.MaintenanceRecord.find({ user: req.params.id })
        .populate("user")
        .populate("asset")
        .populate("maintenanceSchedule")
        .then(dbMaintenanceRecords => res.json(dbMaintenanceRecords))
        .catch(err => res.status(500).json(err));
    },
    // returns all maintenance records assigned to an asset by id
    findByAsset: function (req, res) {
        db.MaintenanceRecord.find({ asset: req.params.id })
        .populate("user")
        .populate("asset")
        .populate("maintenanceSchedule")
        .then(dbMaintenanceRecords => res.json(dbMaintenanceRecords))
        .catch(err => res.status(500).json(err));
    },
    // returns all maintenance records assigned to a schedule by id
    findBySchedule: function (req, res) {
        db.MaintenanceRecord.find({ maintenanceSchedule: req.params.id })
        .populate("user")
        .populate("asset")
        .populate("maintenanceSchedule")
        .then(dbMaintenanceRecords => res.json(dbMaintenanceRecords))
        .catch(err => res.status(500).json(err));
    },
    // creates a maintenance record
    create: function (req, res) {
        db.MaintenanceRecord.create(req.body)
        .then(async (dbMaintenanceRecord) => {
            await db.User.findByIdAndUpdate(dbMaintenanceRecord.user, { $push: { maintenanceRecords: dbMaintenanceRecord._id }});
            await db.Asset.findByIdAndUpdate(dbMaintenanceRecord.asset, { $push: { maintenanceRecords: dbMaintenanceRecord._id }});
            await db.MaintenanceSchedule.findByIdAndUpdate(dbMaintenanceRecord.maintenanceSchedule, { $push: { maintenanceRecords: dbMaintenanceRecord._id }});
            return res.json(dbMaintenanceRecord);
        })
        .catch(err => res.status(500).json(dbMaintenanceRecord));
    },
    // updates a maintenance record by id
    update: function (req, res) {
        db.MaintenanceRecord.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(dbMaintenanceRecord => res.json(dbMaintenanceRecord))
        .catch(err => res.status(500).json(err));
    },
    // deletes a maintenance record
    delete: function (req, res) {
        db.MaintenanceRecord.findByIdAndDlete(req.body)
        .then(async (dbMaintenanceRecord) => {
            await db.User.findByIdAndUpdate(dbMaintenanceRecord.user, { $pull: { maintenanceRecords: dbMaintenanceRecord._id }});
            await db.Asset.findByIdAndUpdate(dbMaintenanceRecord.asset, { $pull: { maintenanceRecords: dbMaintenanceRecord._id }});
            await db.MaintenanceSchedule.findByIdAndUpdate(dbMaintenanceRecord.maintenanceSchedule, { $pull: { maintenanceRecords: dbMaintenanceRecord._id }});
            return res.json(dbMaintenanceRecord);
        })
        .catch(err => res.status(500).json(dbMaintenanceRecord));
    }
}
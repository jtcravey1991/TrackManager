const db = require("../models");

module.exports = {
    // returns all asset records
    findAll: function (req, res) {
        db.Asset.find({})
        .populate("calibrationSchedules")
        .populate("calibrationRecords")
        .populate("maintenanceSchedules")
        .populate("maintenanceRecords")
        .populate("equipmentNotes")
        .populate("repairRecords")
        .then(dbAssets => res.json(dbAssets))
        .catch(err => res.status(500).json(err));
    },
    // returns a single asset by id
    findOne: function (req, res) {
        db.Asset.findById(req.params.id)
        .populate("calibrationSchedules")
        .populate("calibrationRecords")
        .populate("maintenanceSchedules")
        .populate("maintenanceRecords")
        .populate("equipmentNotes")
        .populate("repairRecords")
        .then(dbAsset => res.json(dbAsset))
        .catch(err => res.status(404).json(err));
    },
    // creates an asset
    create: function (req, res) {
        db.Asset.create(req.body)
        .then(dbAsset => req.json(dbAsset))
        .catch(err => res.status(422).json(err))
    },
    // updates an asset by id
    update: function (req, res) {
        db.Asset.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(dbAsset => res.json(dbAsset))
        .catch(err => res.status(422).json(err));
    },
    // deletes an asset and all records/schedules/notes associated with the asset
    delete: function (req, res) {
        db.Asset.findByIdAndDelete(req.params.id)
        .then(async (dbAsset) => {
            await db.CalibrationSchedule.deleteMany({ asset: dbAsset._id });
            await db.CalibrationRecord.deleteMany({ asset: dbAsset._id });
            await db.MaintenanceSchedule.deleteMany({ asset: dbAsset._id });
            await db.MaintenanceRecord.deleteMany({ asset: dbAsset._id });
            await db.EquipmentNote.deleteMany({ asset: dbAsset._id });
            await db.RepairRecord.deleteMany({ asset: dbAsset._id });
            return res.json(dbAsset);
        })
        .catch(err => res.status(500).json(err));
    }
}
const db = require("../models");

module.exports = {
    // returns all repair records
    findAll: function (req, res) {
        db.RepairRecord.find({})
        .populate("user")
        .populate("asset")
        .then(dbRepairRecords => res.json(dbRepairRecords))
        .catch(err => res.status(500).json(err));
    },
    // returns all repair records assigned to the current usre
    findByCurrentUser: function (req, res) {
        db.RepairRecord.find({ user: req.user._id })
        .populate("user")
        .populate("asset")
        .then(dbRepairRecords => res.json(dbRepairRecords))
        .catch(err => res.status(500).json(err));
    },
    // returns all repair records assigned to a user by id
    findByUser: function (req, res) {
        db.RepairRecord.find({ user: req.params.id })
        .populate("user")
        .populate("asset")
        .then(dbRepairRecords => res.json(dbRepairRecords))
        .catch(err => res.status(500).json(err));
    },
    // returns all repair records assigned to an asset by id
    findByAsset: function (req, res) {
        db.RepairRecord.find({ asset: req.params.id })
        .populate("user")
        .populate("asset")
        .then(dbRepairRecords => res.json(dbRepairRecords))
        .catch(err => res.status(500).json(err));
    },
    // returns a single repair record by id
    findOne: function (req, res) {
        db.RepairRecord.findById(req.params.id)
        .then(dbRepairRecord => res.json(dbRepairRecord))
        .catch(err => res.status(404).json(err));
    },
    // creates a repair record
    create: function (req, res) {
        db.RepairRecord.create(req.body)
        .then(async (dbRepairRecord) => {
            await db.User.findByIdAndUpdate(dbRepairRecord.user, { $push: { repairRecords: dbRepairRecord._id }});
            await db.Asset.findByIdAndUpdate(dbRepairRecord.asset, { $push: {repairRecords: dbRepairRecord._id}});
            return res.json(dbRepairRecord)
        })
        .catch(err => res.status(422).json(err));
    },
    // updates a repair record by id
    update: function (req, res) {
        db.RepairRecord.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(dbRepairRecord => res.json(dbRepairRecord))
        .catch(err => res.status(500).json(err));
    },
    // deletes a repair record by id
    delete: function (req, res) {
        db.RepairRecord.findByIdAndDelete(req.params.id)
        .then(async (dbRepairRecord_ => {
            await db.User.findByIdAndUpdate(dbRepairRecord.user, { $pull: { repairRecords: dbRepairRecord._id }});
            await db.Asset.findByIdAndUpdate(dbRepairRecord.asset, { $pull: {repairRecords: dbRepairRecord._id}});
            return res.json(dbRepairRecord)
        })
        .catch(err => res.status(500).json(err));
    }
}
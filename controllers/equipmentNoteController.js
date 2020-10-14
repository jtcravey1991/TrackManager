const db = require("../models");

module.exports = {
    // returns all equipment notes
    findAll: function (req, res) {
        db.EquipmentNote.find({})
        .populate("user")
        .populate("asset")
        .then(dbEquipmentNotes => res.json(dbEquipmentNotes))
        .catch(err => res.status(500).json(err))
    },
    // returns a single equipment note by id
    findOne: function (req, res) {
        db.EquipmentNote.findById(req.params.id)
        .populate("user")
        .populate("asset")
        .then(dbEquipmentNote => res.json(dbEquipmentNote))
        .catch(err => res.status(500).json(err))
    },
    // returns all equipment notes assigned to the logged in user
    findByCurrentUser: function (req, res) {
        db.EquipmentNote.find({ user: req.user._id })
        .populate("user")
        .populate("asset")
        .then(dbEquipmentNotes => res.json(dbEquipmentNotes))
        .catch(err => res.status(500).json(err))
    },
    // returns all equipment notes assigned to a user by id
    findByUser: function (req, res) {
        db.EquipmentNote.find({ user: req.params.id })
        .populate("user")
        .populate("asset")
        .then(dbEquipmentNotes => res.json(dbEquipmentNotes))
        .catch(err => res.status(500).json(err))
    },
    // returns all equipment notes assigned to an asset by id
    findByAsset: function (req, res) {
        db.EquipmentNote.find({ asset: req.params.id })
        .populate("user")
        .populate("asset")
        .then(dbEquipmentNotes => res.json(dbEquipmentNotes))
        .catch(err => res.status(500).json(err))
    },
    // creates an equipment note
    create: function (req, res) {
        db.EquipmentNote.create(req.body)
        .then(async (dbEquipmentNote) => {
            await db.User.findByIdAndUpdate(dbEquipmentNote.user, { $push: { equipmentNotes: dbEquipmentNote._id }});
            await db.Asset.findByIdAndUpdate(dbEquipmentNote.asset, { $push: { equipmentNotes: dbEquipmentNote._id }});
            return res.json(dbEquipmentNote);
        })
        .catch(err => res.status(500).json(err));
    },
    // updates an equipment note
    update: function (req, res) {
        db.EquipmentNote.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(dbEquipmentNote => res.json(dbEquipmentNote))
        .catch(err => res.status(500).json(err));
    },
    // deletes an equipment note
    delete: function (req, res) {
        db.EquipmentNote.create(req.body)
        .then(async (dbEquipmentNote) => {
            await db.User.findByIdAndUpdate(dbEquipmentNote.user, { $push: { equipmentNotes: dbEquipmentNote._id }});
            await db.Asset.findByIdAndUpdate(dbEquipmentNote.asset, { $push: { equipmentNotes: dbEquipmentNote._id }});
            return res.json(dbEquipmentNote);
        })
        .catch(err => res.status(500).json(err));
    }
}
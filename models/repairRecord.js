const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repairRecordSchema = new Schema({
    // foreign key to assigned user
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // foreign key to asset
    asset: {
        type: Schema.Types.ObjectId,
        ref: "Asset",
        required: true
    },
    // date of repair
    date: {
        type: Date,
        required: true
    },
    // description of repair
    description: {
        type: String,
        required: true
    },
    // user notes
    note: {
        type: String,
    }
});

const RepairRecord = mongoose.model("RepairRecord", repairRecordSchema);
module.exports = RepairRecord;
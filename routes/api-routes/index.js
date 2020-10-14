const router = require("express").Router();
const assetRoutes = require("./assets");
const calibrationScheduleRoutes = require("./calibrationSchedules");
const calibrationRecordRoutes = require("./calibrationRecords");
const maintenanceScheduleRoutes = require("./maintenanceSchedules");
const maintenanceRecordRoutes = require("./maintenanceRecords");
const repairRecordRoutes = require("./repairRecords");
const equipmentNoteRoutes = require("./equipmentNotes");

router.use("/assets", assetRoutes);
router.use("/calibration-schedules", calibrationScheduleRoutes);
router.use("/calibration-records", calibrationRecordRoutes);
router.use("/maintenance-schedules", maintenanceScheduleRoutes);
router.use("/maintenance-records", maintenanceRecordRoutes);
router.use("/repair-records", repairRecordRoutes);
router.use("/equipment-notes", equipmentNoteRoutes);

module.exports = router;
const router = require("express").Router();
const maintenanceRecordController = require("../../controllers/maintenanceRecordController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router.use(isAuthenticated);

router.route("/")
    .get(maintenanceRecordController.findAll)
    .post(maintenanceRecordController.create);

router.route("/by-user")
    .get(maintenanceRecordController.findByCurrentUser);

router.route("/by-user/:id")
    .get(maintenanceRecordController.findByUser);

router.route("/by-asset/:id")
    .get(maintenanceRecordController.findByAsset);

router.route("/by-schedule/:id")
    .get(maintenanceRecordController.findBySchedule);

router.route("/:id")
    .get(maintenanceRecordController.findOne)
    .put(maintenanceRecordController.update)
    .delete(maintenanceRecordController.delete);

module.exports = router;
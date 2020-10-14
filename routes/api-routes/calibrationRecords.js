const router = require("express").Router();
const calibrationRecordController = require("../../controllers/calibrationRecordController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router.use(isAuthenticated);

router.route("/")
    .get(calibrationRecordController.findAll)
    .post(calibrationRecordController.create);

router.route("/by-user")
    .get(calibrationRecordController.findByCurrentUser);

router.route("/by-user/:id")
    .get(calibrationRecordController.findByUser);

router.route("/by-asset/:id")
    .get(calibrationRecordController.findByAsset);

router.route("/by-schedule/:id")
    .get(calibrationRecordController.findBySchedule);

router.route("/:id")
    .get(calibrationRecordController.findOne)
    .put(calibrationRecordController.update)
    .delete(calibrationRecordController.delete)

module.exports = router;
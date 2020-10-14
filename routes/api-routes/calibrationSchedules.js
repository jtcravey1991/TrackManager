const router = require(express).Router();
const calibrationScheduleController = require("../../controllers/calibrationScheduleController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router.use(isAuthenticated);

router.route("/")
    .get(calibrationScheduleController.findAll)
    .put(calibrationScheduleController.create);

router.route("/by-user")
    .get(calibrationScheduleController.findByCurrentUser);

router.route("/by-user/:id")
    .get(calibrationScheduleController.findByUser);

router.route("/by-asset/:id")
    .get(calibrationScheduleController.findByAsset);

router.route("/:id")
    .get(calibrationScheduleController.findOne)
    .put(calibrationScheduleController.update)
    .delete(calibrationScheduleController.delete);

// past due routes
router.route("/past-due")
    .get(calibrationScheduleController.findPastDue);
router.route("/past-due/by-user")
    .get(calibrationScheduleController.findPastDueByCurrentUser);
router.route("/past-due/by-user/:id")
    .get(calibrationScheduleController.findPastDueByUser);

module.exports = router;
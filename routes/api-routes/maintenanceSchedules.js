const router = require(express).Router();
const maintenanceScheduleController = require("../../controllers/maintenanceScheduleController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router.use(isAuthenticated);

router.route("/")
    .get(maintenanceScheduleController.findAll)
    .put(maintenanceScheduleController.create);

router.route("/by-user")
    .get(maintenanceScheduleController.findByCurrentUser);

router.route("/by-user/:id")
    .get(maintenanceScheduleController.findByUser);

router.route("/by-asset/:id")
    .get(maintenanceScheduleController.findByAsset);

router.route("/:id")
    .get(maintenanceScheduleController.findOne)
    .put(maintenanceScheduleController.update)
    .delete(maintenanceScheduleController.delete);

// past due routes
router.route("/past-due")
    .get(maintenanceScheduleController.findPastDue)
router.route("/past-due/by-user")
    .get(maintenanceScheduleController.findPastDueByCurrentUser)
router.route("past-due/by-user/:id")
    .get(maintenanceScheduleController.findPastDueByUser)

module.exports = router;
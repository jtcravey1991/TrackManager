const router = require("express").Router();
const repairRecordController = require("../../controllers/repairRecordController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router.use(isAuthenticated);

router.route("/")
    .get(repairRecordController.findAll)
    .post(repairRecordController.create);

router.route("/by-user")
    .get(repairRecordController.findByCurrentUser);

router.route("/by-user/:id")
    .get(repairRecordController.findByUser);

router.route("/by-asset/:id")
    .get(repairRecordController.findByAsset);

router.route("/:id")
    .get(repairRecordController.findOne)
    .put(repairRecordController.update)
    .delete(repairRecordController.delete);

module.exports = router;
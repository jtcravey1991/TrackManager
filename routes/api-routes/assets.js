const router = require("express").Router();
const assetController = require("../../controllers/assetController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router.use(isAuthenticated);

router.route("/")
    .get(assetController.findAll)
    .post(assetController.create);

router.route("/:id")
    .get(assetController.findOne)
    .put(assetController.update)
    .delete(assetController.delete);

module.exports = router;
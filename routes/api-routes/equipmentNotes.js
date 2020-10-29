const router = require("express").Router();
const equipmentNoteController = require("../../controllers/equipmentNoteController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router.use(isAuthenticated);

router.route("/")
    .get(equipmentNoteController.findAll)
    .post(equipmentNoteController.create)

router.route("/by-user")
    .get(equipmentNoteController.findByCurrentUser);

router.route("/by-user/:id")
    .get(equipmentNoteController.findByUser);

router.route("/by-asset/:id")
    .get(equipmentNoteController.findByAsset);

router.route("/:id")
    .get(equipmentNoteController.findOne)
    .put(equipmentNoteController.update)
    .delete(equipmentNoteController.delete);

module.exports = router;
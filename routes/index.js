const router = require("express").Router();
const path = require("path");
const authenticationRoutes = require("./authentication");
const apiRoutes = require("./api-routes");

// Authentication routes
router.use("/authentication", authenticationRoutes);

// API routes
router.use("/api", apiRoutes);

// directs user to client if no api routes are hit
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
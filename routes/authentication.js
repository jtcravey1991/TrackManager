const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();
const path = require("path");

// creates a user
router.post("/signup", (req, res) => {
    db.User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    .then((dbUser) => {
        res.json({
            username: dbUser.username,
            firstName: dbUser.firstName,
            lastName: dbUser.lastName
        });
    })
    .catch(err => res.status(400).json(err));
});

// login route
router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
});

// logout route
router.get("/logout", (req, res) => {
    req.logout();
    res.status(200).sendFile(path.join(__dirname, "../client/build/index.html"));
});

// checks if the a session exists
router.get("/isAuthenticated", function (req, res) {
    if(req.user) {
        res.json({ isAuthenticated: true });
    } else {
        res.json({ isAuthenticated: false });
    }
});

module.exports = router;
const express = require("express");
const router = express.Router();

// Require controller modules
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

router.get("/", (req, res) => res.render("index"));

/// USER  ROUTES ///
router.get("/sign-up", (req, res) => res.render("user_form"));

module.exports = router;

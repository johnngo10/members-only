const express = require("express");
const router = express.Router();

// Require controller modules
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

/// USER  ROUTES ///

// GET request for new user form
router.get("/sign-up", user_controller.user_create_get);

// POST request for new user
router.post("/sign-up", user_controller.user_create_post);

// GET request for login form
router.get("/login", user_controller.user_login_get);

// POST request for login form
router.post("/login", user_controller.user_login_post);

// GET request for logging out user
router.get("/logout", user_controller.user_logout_get);

module.exports = router;

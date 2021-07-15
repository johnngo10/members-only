const express = require("express");
const router = express.Router();

// Require controller modules
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

// Index Route
router.get("/", message_controller.messages_display_get);

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

/// MESSAGE ROUTES ///

// GET request for new message form
router.get("/new-message", message_controller.message_create_get);

// POST request for new message form
router.post("/new-message", message_controller.message_create_post);

// POST request for deleting message
router.post("/:id", message_controller.message_delete_post);

module.exports = router;

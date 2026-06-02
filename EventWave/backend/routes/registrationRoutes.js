const express = require("express");
const router = express.Router();
const {
    registerForEvent,
    getMyRegistrations,
    getEventRegistrations
} = require("../controllers/registrationController");
const {
    verifyToken,
    isAdmin
} = require("../middleware/authMiddleware");

router.post(
    "/register/:eventId",
    verifyToken,
    registerForEvent
);
router.get(
    "/my-registrations",
    verifyToken,
    getMyRegistrations
);
router.get(
    "/events/:id/registrations",
    verifyToken,
    isAdmin,
    getEventRegistrations
);
module.exports = router;
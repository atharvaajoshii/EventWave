const express = require("express");
const router = express.Router();

const {getAllEvents,getEventById,createEvent} = require("../controllers/eventController");

const {verifyToken,isAdmin} = require("../middleware/authMiddleware");

router.get("/",verifyToken,getAllEvents);

router.get(
    "/:id",
    verifyToken,
    getEventById
);

router.get(
    "/:id",
    verifyToken,
    getEventById
);
router.post(
    "/",
    verifyToken,
    isAdmin,
    createEvent
);

module.exports = router;
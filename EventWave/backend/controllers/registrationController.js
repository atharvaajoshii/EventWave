const db = require("../config/db");
const { get } = require("../routes/authRoutes");


const registerForEvent = async (req, res) => {
    try {
        const uid = req.user.uid;
        const eventId = req.params.eventId;

        if (req.user.role === "admin") {
            return res.status(403).json({
                message: "Admins cannot register for events"
            });
        }

        const [events] = await db.query(
            "SELECT * FROM events WHERE eid = ?",
            [eventId]
        );

        if (events.length === 0) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const event = events[0];

        const [existing] = await db.query(
            `
                SELECT *
                FROM registrations
                WHERE uid = ?
                AND eid = ?
            `,
            [uid, eventId]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                message: "You are already registered for this event"
            });
        }

        const [countResult] = await db.query(
            `
                SELECT COUNT(*) AS total
                FROM registrations
                WHERE eid = ?
            `,
            [eventId]
        );

        const currentRegistrations = countResult[0].total;
        if (currentRegistrations >= event.capacity) {
            return res.status(400).json({
                message: "Event is full"
            });
        }
        await db.query(
            `
                INSERT INTO registrations(uid,eid)
                VALUES(?,?)
            `,
            [uid, eventId]
        );
        res.status(201).json({
            message: "Registration successful"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


const getMyRegistrations = async (req, res) => {
    try {

        const uid = req.user.uid;

        const [registrations] = await db.query(
            `
            SELECT
                e.eid,
                e.eventname,
                e.date,
                e.venue,
                e.capacity
            FROM registrations r
            JOIN events e
                ON r.eid = e.eid
            WHERE r.uid = ?
            ORDER BY e.date ASC
            `,
            [uid]
        );

        res.status(200).json(registrations);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


const getEventRegistrations = async (req, res) => {
    try {

        const eventId = req.params.id;

        const [registrations] = await db.query(
            `
            SELECT
                u.uid,
                u.name,
                u.username
            FROM registrations r
            JOIN users u
                ON r.uid = u.uid
            WHERE r.eid = ?
            `,
            [eventId]
        );

        res.status(200).json(registrations);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
module.exports = {
    registerForEvent, getMyRegistrations,getEventRegistrations
};





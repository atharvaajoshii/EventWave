const db = require("../config/db");
const getAllEvents = async (req, res) => {
    try {
        const [events] = await db.query(`
            SELECT
            e.*,
            COUNT(r.regid) AS registrationCount
            FROM events e
            LEFT JOIN registrations r
            ON e.eid = r.eid
            GROUP BY e.eid
            ORDER BY e.date ASC
        `);
        res.status(200).json(events);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const getEventById = async (req,res)=>{
    try{

        const eventId = req.params.id;

        const [event] = await db.query(`
            SELECT
                e.*,
                COUNT(r.regid) AS registrationCount
            FROM events e
            LEFT JOIN registrations r
                ON e.eid = r.eid
            WHERE e.eid = ?
            GROUP BY e.eid
        `,[eventId]);

        if(event.length === 0){
            return res.status(404).json({
                message:"Event not found"
            });
        }

        res.status(200).json(event[0]);

    }catch(error){
        console.log(error);

        res.status(500).json({
            message:"Server Error"
        });
    }
};

const createEvent = async (req,res)=>{
    try{

        console.log("BODY:", req.body);
        const {
            eventname,
            date,
            venue,
            capacity
        } = req.body;
        
        if(
            !eventname ||
            !date ||
            !venue ||
            !capacity
        ){
            return res.status(400).json({
                message:"All fields are required"
            });
        }

        const [result] = await db.query(
            `
            INSERT INTO events
            (eventname,date,venue,capacity)
            VALUES (?,?,?,?)
            `,
            [eventname,date,venue,capacity]
        );

        res.status(201).json({
            message:"Event created successfully",
            eid: result.insertId
        });

    }catch(error){
        console.log(error);

        res.status(500).json({
            message:"Server Error"
        });
    }
};
module.exports = {getAllEvents,getEventById,createEvent};
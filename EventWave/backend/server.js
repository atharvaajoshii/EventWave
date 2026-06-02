require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./config/db");
const authRoutes =  require("./routes/authRoutes");
const { verifyToken,isAdmin } = require("./middleware/authMiddleware");
const eventRoutes = require("./routes/eventRoutes");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("backend running properly");
});
db.getConnection()
    .then((connection)=>{
        console.log("databse connected ");
        connection.release();
    })
    .catch((err)=>{
        console.log("database not connected:",err.message);
    })


app.use("/api", authRoutes);
app.use("/api/events", eventRoutes);

app.get("/api/protected",verifyToken,(req,res)=>{
    res.json({
        message:"protected route accessed",
        user:req.user
    });
});

app.get("/api/admin-test",verifyToken,isAdmin,(req,res)=>{
    res.json({
        message:"welcome admin"
    });
});

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});

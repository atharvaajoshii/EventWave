require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./config/db");
const authRoutes =  require("./routes/authRoutes");
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

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});

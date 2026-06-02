const db = require('../config/db');
const jwt = require("jsonwebtoken");
const loginUser = async (req, res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const [rows] = await db.query('select * from users where username=?',[username]);

        if(rows.length===0){
            return res.status(401).json({
                message:"Invalid Credentials"
            });
        }
        const user = rows[0];
        if(user.password!==password){
            return res.status(401).json({
                message:"Invalid credentials"
            });
        }
        const token=jwt.sign(
            {
                uid:user.uid,
                role:user.role
            },
            process.env.JWT_SECRET,{
                expiresIn:"1d"
            }
        );
        res.status(200).json({
            token,
            role:user.role
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message:"Server issue"
        });
    }
};
module.exports={
    loginUser
};
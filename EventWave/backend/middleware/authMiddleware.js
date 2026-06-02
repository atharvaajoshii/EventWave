const jwt = require("jsonwebtoken");
const verifyToken = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            message:"no token provided (user not logged in)"
        });
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded);
        next();

    }catch(error){
        return res.status(401).json({
            message:"Invalid token"
        });
    }
};
const isAdmin = (req,res,next)=>{
    if(req.user.role!=="admin"){
        res.status(403).json({
            message:"access denied"
        });
    }
    next();
};
module.exports = {verifyToken,isAdmin};
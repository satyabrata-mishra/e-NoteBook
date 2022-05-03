const jwt= require('jsonwebtoken')
require('dotenv').config()


const fetchuser= (req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send("Token Not Avaliable");
    }
    else{
        try {
            const data=jwt.verify(token,process.env.jwt_secret);
            req.user=data.userid;
            // console.log(data);
            next();   
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

module.exports=fetchuser;
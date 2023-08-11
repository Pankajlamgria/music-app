{require("dotenv").config();}
const jwt=require("jsonwebtoken");
const SECRET=process.env.secret;


const fetchuser=async(req,res,next)=>{
    const authtoken=req.header('authtoken');
    if(authtoken){
        const tokendetail=jwt.verify(authtoken,`${SECRET}`);
        req.userid=tokendetail.user.id;
        // console.log(req.userid);
        next();
    }
    else{
        console.log("no access");
        next();
    }
}
module.exports=fetchuser;
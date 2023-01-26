import jwt from "jsonwebtoken"
import User from "../model/userSchema.js"

const Authencticate = async(req,res,next) => {

   const JWT = req.query.token;
 
   if (!JWT) return res.status(401).send({ error: 'No JWT provided' });
   jwt.verify(JWT, process.env.SECRET, (error, user) => {
      if (error) return res.status(401).send({ error: 'Invalid JWT' });
     req.user = user;
  
     next();
   });
};
export default Authencticate
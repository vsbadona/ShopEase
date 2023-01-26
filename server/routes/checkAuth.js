import express from "express"
import Authencticate from "../middleware/authenticate.js"
import User from "../model/userSchema.js"

const routes = express.Router()

routes.get('/',Authencticate , async(req,res)=>{
    const {_id} = req.user
    const findUser = await User.findById(_id)
    if(findUser){
        res.json({success : "User Authenticated",user:findUser})
    }else{
        res.json({alert : "Invalid User"})
    }
})

export default routes

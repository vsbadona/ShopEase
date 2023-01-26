import mongoose from "mongoose";
import Users from "../model/userSchema.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const generateToken = async(req,res) => {
    const _id = req._id
   const payload = {
    _id : req._id
   }
   const token  = jwt.sign(payload, process.env.SECRET)
    if(token){
        const findUser = await Users.findById(_id)
        if(findUser){
           findUser.token = token
           await findUser.save()
        }else{
            res.json({alert : "User Not Found"})
        }
    }else{
       res.json({alert : "Invalid Id Provided"})     
    }
}

export const getUsers = async (req, res) => {
    const users = await Users.find()
    res.json(users)
}

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.json({ alert: "All fields are required" })
    }
    const ifExist = await Users.findOne({ email: email })
    if (ifExist) {
        res.json({ alert: "email already registered" })
    } else {
        const passwordToken = await bcrypt.hash(password , 12)
        const getUser = await new Users({
            name: name,
            email: email,
            password: passwordToken
        })
        if (getUser) {
            res.json({ success: "User Registered Successfully" })
            await getUser.save()
        } else {
            res.json({ error: "Unable to register user" })
        }
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body.detail
    if (!email || !password) {
        res.json({ alert: "Please enter both email and password" })
    }
    const checkUser = await Users.findOne({ email: email })
    if (!checkUser) {
        res.json({ alert: "email not registered" })
    }
    else {
        
        const isMatch = await bcrypt.compare(password, checkUser.password)
        if (isMatch) {
          generateToken(checkUser)
      res.json({token : checkUser.token,Id : checkUser._id })
  } else {
      res.json({ alert: "incorrect password" })
  }
    }
}

export const updateUser = async (req, res) => {
    const { email, name, image, dateofbirth, phone, id } = req.body
    if (!email && !name && !image && !dateofbirth && !phone) {
        res.json({ alert: "enter something to change" })
    } else {
        const findUser = await Users.findById(id)
        if (findUser) {
            const saveUser = await findUser.update({
                name: name, email: email, image: image, dateofbirth: dateofbirth, phone: phone
            })
            if(saveUser){
                res.json({success : "Updated Successfully"})
            }else{
                res.json({error : "Can't Update User"})
            }
        }else{
            res.json({alert : "User not found"})
        }

    }
}

export const deleteUser = async(req,res) => {
    const {password,id} = req.body
    const findUser = await Users.findById(id)
    if(findUser){
        const checkAuth = findUser.password == password
        if(checkAuth){
            const deleteUser = await findUser.delete()
            if(deleteUser){
                res.json({success : "User deleted successfully"})
            }else{
                res.json({error : "Can't Delete User"})
            }
        }else{
            res.json({alert :"please verify that this account belongs to you"})
        }
    }else{
        res.json({alert : "no user found"})
    }
}

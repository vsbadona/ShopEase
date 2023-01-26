import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : "user"
    },
    image : {
        type : String
    },
    phone : {
        type : Number
    },
    dateofbirth : {
        type : Date
    },
    token: {
        type: String
    },
    cart : [
        {
            name : String,
            image : String,
            price : Number,
            category : String,
            quantity : {
                type : Number,
                min: 1
            }
        }
    ],
    order : [
        {
            name : String,
            image : String,
            price : Number,
            quantity : {
                type : Number,
                min: 1
            },
            total : Number
        }
    ],
    address : [
        {
            name : String,
            village : String,
            district : String,
            state : String,
            pincode : Number
        }
    ]
})

const userData = mongoose.model("Users",userSchema)
export default userData
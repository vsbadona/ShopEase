import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name : String,
    email : String,
    message : String
})

const contactData = mongoose.model("contact",contactSchema)
export default contactData
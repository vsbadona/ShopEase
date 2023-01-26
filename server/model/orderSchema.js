import mongoose from "mongoose";



const orderSchema = mongoose.Schema({
    id : {
        type : String,
        required : true
    },
  items : [],
    fullname : {
        type : String
    },
    village : {
        type : String
    },
    state : {
        type : String
    },
    district : {
        type :String
    },
    pincode : {
        type : Number
    },
    total : {
        type : Number
    }

})

const orderData = mongoose.model("Orders",orderSchema)
export default orderData
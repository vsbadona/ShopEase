import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    category : {
        type : String,
        required : true
    },
    items : [{
        name : String,
        description : String,
        image : String,
        price : Number,
        category : String,
        available : Boolean 
    }]
})

const categoryData = mongoose.model('category',categorySchema)
export default categoryData
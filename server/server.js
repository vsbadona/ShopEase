import express from "express"
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import checkUserRoute from "./routes/checkAuth.js"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import orderRoutes from "./routes/orderRoutes.js"
import Authencticate from "./middleware/authenticate.js"
import addressRoutes from "./routes/addressRoutes.js"

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/authenticate',checkUserRoute)
app.use('/users',userRoutes)
app.use('/category',categoryRoutes)
app.use('/contact',contactRoutes)
app.use('/cart',cartRoutes)
app.use('/address',addressRoutes)
app.use('/order',orderRoutes)
app.listen(process.env.PORT || 5000,()=>console.log("App Works On http://localhost:5000"))

mongoose.connect(process.env.CONNECTION_URL)
mongoose.set('strictQuery', true)
const db = mongoose.connection
db.on('error',(err)=>console.log(err.message,"Can't connect to db"))
db.once('open',()=>console.log("Connected to db successfully"))
import express from "express"
import { addAddress, deleteAddress } from "../controller/addressController.js"
import User from "../model/userSchema.js"

const routes = express.Router()

routes.post('/add',addAddress)
routes.delete('/delete',deleteAddress)

export default routes
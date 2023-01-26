import express from "express";
import { addCart, deleteCart, emptyCart, getCart, updateCart } from "../controller/cartController.js";
import Authencticate from "../middleware/authenticate.js";

const routes = express.Router()

routes.get('/getcart',Authencticate,getCart)
routes.post('/addcart',addCart)
routes.delete('/removecart',deleteCart),
routes.patch('/updatecart',updateCart)
routes.post('/empty',emptyCart)


export default routes
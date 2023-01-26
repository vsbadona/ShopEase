import express from "express"
import { orderNow,allOrders } from "../controller/OrderController.js"
import Order from "../model/orderSchema.js"

const  routes = express.Router()

routes.post('/order',orderNow)
routes.get('/orders',allOrders)

export default routes
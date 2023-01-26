import express from "express";
import { sendMessage,getMessage,deleteMessage } from "../controller/contactController.js";
const routes = express.Router()

routes.post('/message',sendMessage)
routes.get('/',getMessage)
routes.delete('/delete',deleteMessage)

export default routes
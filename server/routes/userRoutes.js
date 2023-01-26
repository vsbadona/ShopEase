import express from "express";
import { registerUser,getUsers, loginUser, updateUser, deleteUser } from "../controller/userController.js";

const routes = express.Router()

routes.post('/register',registerUser)
routes.get('/users',getUsers)
routes.post('/login',loginUser)
routes.patch('/update',updateUser)
routes.delete('/delete',deleteUser)

export default routes
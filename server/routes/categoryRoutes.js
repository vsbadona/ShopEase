import express from "express";
import { createCategory, createItem, deleteCategory, deleteItem, editCategory, getCategory, updateItem } from "../controller/categoryController.js";

const routes = express.Router()

routes.post('/create',createCategory)
routes.get('/',getCategory)
routes.post('/edit',editCategory)
routes.delete('/delete',deleteCategory)
routes.post('/additem',createItem)
routes.post('/updateItem',updateItem)
routes.delete('/deleteitem',deleteItem)

export default routes
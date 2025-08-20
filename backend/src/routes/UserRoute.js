import express from "express";
import {createUser,getAllUsers,getUserById,UpdateUser,DeleteUser} from "../controllers/UserController.js";


const route= express.Router()

route.post("/user",createUser)
route.get("/users",getAllUsers)
route.get("/user/:id",getUserById)
route.put("/user/update/:id",UpdateUser)
route.delete("/user/delete/:id",DeleteUser)

export default route;

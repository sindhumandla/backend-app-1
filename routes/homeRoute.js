import homePage from "../controllers/homeController.js";
import express from "express"

const homeRouter = express.Router()

homeRouter.get("/",homePage)

export default homeRouter
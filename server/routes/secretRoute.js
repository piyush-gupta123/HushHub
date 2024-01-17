import express from "express";
import { secretCreate, secretGet } from "../controllers/secretCreator.js";

const secretRouter = express.Router();

secretRouter.get('/',secretGet)
secretRouter.post('/create',secretCreate)

export default secretRouter;
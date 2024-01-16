import express from "express";
import { secretCreate } from "../controllers/secretCreator.js";

const secretRouter = express.Router();

secretRouter.post('/create',secretCreate)

export default secretRouter;
import express from "express"
import registrerEmployeesController from "../controllers/registreremployeescontrollers.js";

const router = express.Router();

router.route("/").post(registrerEmployeesController.registrer)

export default router
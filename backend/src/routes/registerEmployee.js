import express from "express"
import registerEmployeesController from "../controllers/registerEmployeesController";

const router = express.Router();

router.route("/").post(registerEmployeesController.registrer)

export default router
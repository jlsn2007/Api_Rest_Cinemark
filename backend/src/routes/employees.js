import express from "express";
import employeesControllers from "../controllers/employeesControllers.js";

const router = express.Router();

router.route("/")
.get(employeesControllers.getEmployees)
.post(employeesControllers.postEmployees)

router.route("/:id")
.put(employeesControllers.putEmployees)
.delete(employeesControllers.deleteEmployees);

export default router;
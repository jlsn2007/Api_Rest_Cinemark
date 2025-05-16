import express from "express";
import customersControllers from "../controllers/customersControllers.js";

const router = express.Router();

router.route("/")
.get(customersControllers.getCustomers)
.post(customersControllers.postCustomers)

router.route("/:id")
.put(customersControllers.putCustomers)
.delete(customersControllers.deleteCustomers);

export default router;
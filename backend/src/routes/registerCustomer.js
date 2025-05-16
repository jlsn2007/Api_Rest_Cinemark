import express from "express"
import registerCustomerController from "../controllers/registerCustomersController";

const router = express.Router()

router.route("/").post(registerCustomerController.registerCustomer)
router.route("/verifyCodeEmail").post(registerCustomerController.verifyCodeEmail)

export default router;
import express from "express";
import customersRoutes from "./src/routes/customers.js";
import employeesRoutes from "./src/routes/employees.js";
import moviesRoutes from "./src/routes/movies.js"
import loginRoutes from "./src/routes/login.js"
import logoutRoutes from "./src/routes/logout.js"
import cookieParser from "cookie-parser";
import registerCustomerRoutes from "./src/routes/registerCustomer.js"
import registerEmployeesRoutes from "./src/routes/registerEmployee.js"
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js"

const app = express();

app.use(express.json());

app.use(cookieParser())

app.use("/api/customers", customersRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/movies", moviesRoutes)
app.use("/api/registerCustomer", registerCustomerRoutes)
app.use("/api/registerEmployee", registerEmployeesRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/recoveryPassword", recoveryPasswordRoutes);

export default app;
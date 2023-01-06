import express from "express";
import cors from "cors";
import config from "./config/config.js";

import loginRouter from "./routes/auth.router.js";
import userRouters from "./routes/users.router.js";
import accountRoutes from "./routes/accounts.router.js";
import transferRoutes from "./routes/transfers.router.js";
import categoryRoutes from "./routes/categories.router.js";
import exchangeRoutes from "./routes/exchanges.router.js";
import expenseIncomeRoutes from "./routes/expenseIncome.router.js";
import reportsRoutes from "./routes/reports.router.js";
import statesRoutes from "./routes/state.router.js";

const app = express();

//settings
app.set("port", config.port);
const path = "/api";

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use(path, loginRouter);
app.use(path, userRouters);
app.use(path, accountRoutes);
app.use(path, transferRoutes);
app.use(path, categoryRoutes);
app.use(path, exchangeRoutes);
app.use(path, expenseIncomeRoutes);
app.use(path, reportsRoutes);
app.use(path, statesRoutes);

app.get("*", (req, res) => {
  res.status(404).json({ message: "Error 404 - endpoint not found" });
});

export default app;

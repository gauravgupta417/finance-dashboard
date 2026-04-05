import express from "express";
import cors from "cors";
import mongoConnect from './config/database.js';
import userRoutes from "./modules/user/userroutes.js";
import financeRoutes from "./modules/finance/financeroutes.js";
import dashboardRoutes from "./modules/dashboard/dashboardroutes.js";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config({quiet:true});

const app = express();
await mongoConnect();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 50,
  message: "Too many requests, try again later",
});

app.use("/api", limiter);

//Middleware 
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Server listening at http://localhost:${PORT}`);

});

export default app;
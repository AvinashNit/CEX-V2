import express from "express"
import dotenv from "dotenv";
import authRouter from "./src/routes/auth";
import orderRouter from "./src/routes/orderRoute";
import { authMiddleware } from "./src/middlewares/auth";
import { addBalanceHandler } from "./src/order/addBalanceHandler";
import { fetchBalanceHandler } from "./src/order/fetchBlanceHandler";
import balanceHandler from "./src/order/balanceRelateOps";
dotenv.config();

const app = express();

balanceHandler.seedBalance("avinashETH", "ETH", 10);


app.use(express.json());

app.use(authRouter);
app.post("/addbalance", authMiddleware, addBalanceHandler );
app.get("/balance", authMiddleware, fetchBalanceHandler )

app.use(orderRouter);






app.listen( process.env.PORT || 3000, ()=>{
    console.log(`Server running over "http://localhost:${process.env.PORT || 3000}"`);
} )
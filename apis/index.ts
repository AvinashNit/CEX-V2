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

// balanceHandler.seedBalance("avinashETH", "ETH", 10);


app.use(express.json());

app.use(authRouter);
app.post("/addbalance", authMiddleware, addBalanceHandler );
app.get("/balance/:market", authMiddleware, fetchBalanceHandler )

app.use(orderRouter);

app.get("/orderbook/:market", authMiddleware, async(req, res)=>{
    const market = req.params.market as string;
    if(!market)
        return res.status(403).json({message :" no valid market"});
    const response = await fetch(`http://localhost:4000/orderbook/${market}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log(response.body);
   const data = await response.json();    
   return res.status(200).json(data);
    
    })




app.listen( process.env.PORT || 3000, ()=>{
    console.log(`Server running over "http://localhost:${process.env.PORT || 3000}"`);
} )
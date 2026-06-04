import express from  "express";
import { matchingEngine } from "./engineCall";
import engineRouter  from "./engineRouter";
// matchingEngine.seedOrder({id:"avinashETH", qty:5, price:100},"sell","ETH")

const app = express();

app.use (express.json());

app.use(engineRouter);



app.listen(4000, ()=>{
    console.log("Engine server started listening to request");
})
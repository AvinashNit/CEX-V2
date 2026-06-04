import { Router } from "express";
import { cancelHandler, getOrderBookHandler, orderHandler } from "./engineCall";


const engineRouter  =  Router();


engineRouter.post("/order" , orderHandler);
engineRouter.get("/orderbook" , getOrderBookHandler);
engineRouter.post("/cancel", cancelHandler);

export default engineRouter;
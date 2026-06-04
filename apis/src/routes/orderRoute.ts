import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { orderHandler } from "../order/orderHandler";


const orderRouter = Router();

orderRouter.post("/order", authMiddleware , orderHandler);

export default orderRouter;
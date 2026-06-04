import balanceHandler from "./balanceRelateOps";
import type { Request, Response} from "express";


export function addBalanceHandler( req: Request, res:Response)
{
    const id = req.id;
    const amount = req.body.amount;
    const updatedBAlance = balanceHandler.addBalance(id! , amount);
    res.status(200).json({updatedBAlance});
}



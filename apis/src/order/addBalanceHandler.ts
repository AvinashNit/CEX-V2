import balanceHandler from "./balanceRelateOps";
import type { Request, Response} from "express";


export function addBalanceHandler( req: Request, res:Response)
{
    const id = req.id;
    const amount = req.body.amount;
    const market = req.body.market;
    const updatedBAlance = balanceHandler.addBalance(id! , amount, market);
    res.status(200).json({updatedBAlance});
}



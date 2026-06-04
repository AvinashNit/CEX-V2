import balanceHandler from "./balanceRelateOps";
import type { Request, Response} from "express";



export function fetchBalanceHandler( req: Request, res: Response)
{
    const id = req.id;
    const market = req.body.market;
    if(!market)
        return res.status(400).json({message :"No valid market provided"})
    const balance = balanceHandler.getBalance( id! , market);
    if(!balance)
        return res.status(400).json({message: "No balance"})
    return res.status(200).json({balance});

}
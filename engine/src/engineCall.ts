import { Engine } from "./engineArchitecture";
import type { Request , Response } from "express";


export const matchingEngine = new Engine();


export function orderHandler( req: Request , res: Response )
{
    console.log("orderHandler called");
    const {order , type , market}   = req.body;
    const result = matchingEngine.matchEngineCall(order,type , market);
    res.status(200).json(result);
}


export function cancelHandler( req: Request , res: Response )
{
    const { id, market, type} = req.body;
    const result  = matchingEngine.cancelOrder(id,market,type);
    res.status(200).json({result});

}


export function getOrderBookHandler( req: Request , res: Response)
{
    console.log("inside getOrderBookHandler")
    const  market  = req.params.market as string;
    const result  = matchingEngine.getOrderBook(market);
    console.log(result);
    if(result  === undefined)
        return res.status(200).json({bids:[],asks: []});
    return res.status(200).json(result);
}


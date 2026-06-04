import type { Request , Response } from "express"
import { orderSchema } from "./orderRelatedTypes";
import balanceHandler  from "./balanceRelateOps";
import z from "zod";
import { id } from "zod/locales";

export async  function orderHandler( req: Request, res: Response)
{
        const { market , price, qty , type} = req.body;
        if(market === undefined || price === undefined || qty === undefined  || type === undefined)
            return res.status(403).json({message:" Invalid order body"});
        const validatedOrder = orderSchema.safeParse({market, price: price, qty, type });
        if(!validatedOrder.success)
            return res.status(403).json({message:" Invalid order body"});
        if(!balanceHandler.canOrderPlaced(req.id!, validatedOrder.data))
            return res.status(403).json({message :`Insufficient${type === "buy"? "INR" : market}`})
        const fill = await callEngine(req.id!, validatedOrder.data) as [{id:string, qty:number, price:number}];
        console.log(fill);
        for(let i= 0;i < fill.length;i++)
        {
            console.log(`${req.id} was taker and ${fill[i]?.id } was maker`);
            balanceHandler.updateThroughTransaction( fill[i]!.id, req.id!, fill[i]!.price, fill[i]!.qty, validatedOrder.data.market, validatedOrder.data.type);
            //call fill db
        }
        // callDbOrder()
        return res.status(200).json({fill});

        
}


async function  callEngine( id: string,  order: z.infer<typeof orderSchema>)
{
    const response = await fetch("http://localhost:4000/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({order:{
            id: id,
            qty: order.qty,
            price: order.price,
            },
            type: order.type,
            market: order.market
        })
    });
   const data = await response.json();    
   return data;
}
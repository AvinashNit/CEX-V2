import type{ balanceSchema , userBalance, orderSchema } from "./orderRelatedTypes";
import z from "zod";

class balanceClass {
    private balance : balanceSchema | undefined ;
    constructor()
    {
        this.balance = new Map();
    }

     canOrderPlaced( id: string, order: z.infer<typeof orderSchema>): boolean{
        let market = order.type === "buy" ? "INR" : order.market;
        if(!this.balance?.get(id))
            return false;
        else if( !this.balance.get(id)?.get(market))
            return false;
        else if(order.type === "buy"){
            let can = this.balance.get(id)!.get(market)!.available >= order.price * order.qty;
            if(!can)
                return can;
            this.balance.get(id)!.get(market)!.available -= order.price * order.qty;
            this.balance.get(id)!.get(market)!.locked += order.price * order.qty;
            return true;
        }
        else{
            let can = this.balance.get(id)!.get(market)!.available >= order.qty;
            if(!can)
                return can;
            this.balance.get(id)!.get(market)!.available -= order.qty;
            this.balance.get(id)!.get(market)!.locked += order.qty;
            return true;
        }

    }
    updateThroughTransaction( makerId: string, takerId: string , price: number, qty :number, market :string, type: "buy" | "sell")
    {
        // if(!this.balance?.get(makerId))
        //     this.balance?.set(makerId ,new Map());
        // if(!this.balance?.get(takerId))
        //     this.balance?.set(takerId ,new Map());
        // if(!this.balance?.get(makerId)?.get(market)){
        //     this.balance?.get(makerId)?.set(market,{available:0, locked:0});
        //     this.balance?.get(makerId)?.set("INR",{available:0, locked:0});
        // }
        // if(this.balance?.get(takerId)?.get(market)){
        //     this.balance.get(takerId)?.set(market,{available:0, locked:0});
        //     this.balance.get(takerId)?.set("INR",{available:0, locked:0});
        // }
        this.balance?.get(takerId)?.get(market) === undefined ? this.balance?.get(takerId)?.set(market ,{available:0, locked:0}): null;

        this.balance?.get(makerId)?.get("INR") === undefined ? this.balance?.get(makerId)?.set("INR" ,{available:0, locked:0}): null;

        if(type === "buy"){
            
            this.balance!.get(takerId)!.get("INR")!.locked -= price * qty;
            this.balance!.get(makerId)!.get(market)!.locked -= qty;
            this.balance!.get(takerId)!.get(market)!.available += qty;
            this.balance!.get(makerId)!.get("INR")!.available += price * qty;
        }
        else{
            
            this.balance!.get(takerId)!.get(market)!.locked -= qty;
            this.balance!.get(makerId)!.get(market)!.available += qty;
            this.balance!.get(takerId)!.get("INR")!.available += price * qty;
            this.balance!.get(makerId)!.get("INR")!.locked -= price * qty;
        }
    }
    addBalance(id: string , amount: number, market?: string)
    {
        if(!market){
        if(!this.balance?.get(id))
            this.balance?.set(id, new Map());
        if(!this.balance?.get(id)?.get("INR"))
            this.balance?.get(id)?.set("INR", {available:0, locked:0});
        this.balance!.get(id)!.get("INR")!.available += amount;
        return this.balance?.get(id)?.get("INR");
    }
        else{
            if(!this.balance?.get(id))
                this.balance?.set(id, new Map());
            if(!this.balance?.get(id)?.get(market))
                this.balance?.get(id)?.set(market, {available: 0 ,locked: 0});
            this.balance!.get(id)!.get(market)!.available+=amount;
            return this.balance?.get(id)?.get(market);
        }

    
    }
    getBalance( id: string, market: string)
    {
        if(!this.balance?.get(id))
            return undefined;
        if(!this.balance?.get(id)?.get(market))
            return undefined;
        return this.balance?.get(id)?.get(market);
    }
    seedBalance(id: string , market: string , qty: number)
    {
        this.balance?.set(id, new Map());
        this.balance?.get(id)?.set(market , { available:4, locked:qty})
    }

}


const balanceHandler = new balanceClass();
export default balanceHandler;
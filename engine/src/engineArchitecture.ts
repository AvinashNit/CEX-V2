
import type{ Order, individualOrder } from "./type"

export class Engine{
    private orderBook: Order ;
    constructor()
    {
        this.orderBook = new Map();
    }

    matchEngineCall(takerOrder : individualOrder, type : "buy"|"sell", market : string){
        console.log("starting engine");
        let remaingQty = takerOrder.qty;
        console.log(takerOrder)
        console.log(type)
        console.log(market)
        const result: individualOrder[] = [];
        let array: undefined | individualOrder[];
        if(this.orderBook.get(market) === undefined)
        {
            console.log("empty market to fill")
            this.orderBook.set(market,{bids: [], asks: []});
            console.log("created market")
            if(type === "buy"){
                this.orderBook.get(market)!.bids.push(takerOrder);
                console.log("put on order")
                    return result;

            }
            else{
                this.orderBook.get(market)!.asks.push(takerOrder);
                    return result;
            }
        }
        else{
            
            if(type === "buy")
            {
                array = this.orderBook.get(market)!.asks;//sorted in increasing order
                for( let i =0; i< array.length && remaingQty > 0 && takerOrder.price >= array[i]!.price;  i++ ){
                    if(remaingQty > array[i]!.qty){
                        remaingQty -= array[i]!.qty;
                        result.push(array[i]!);
                        array.splice(i,1);
                        i--;
                    }                    
                    else{
                            
                            array[i]!.qty -= remaingQty;
                            result.push({...array[i]!, qty:remaingQty});
                            remaingQty = 0;
                            
                    }
                }
            }
            else{

                array = this.orderBook.get(market)?.bids;//sorted in decreasing order
                for( let i = 0; i< array!.length && remaingQty > 0 && takerOrder.price <= array![i]!.price; i++)
                {
                    if( remaingQty > array![i]!.qty){
                        remaingQty -= array![i]!.qty;
                        result.push(array![i]!);
                        array!.splice(i,1);
                        i--;
                }
                else{
                    array![i]!.qty -= remaingQty;
                    result.push({...array![i]!, qty:remaingQty});
                    remaingQty = 0;
                    
                }
            }

            }
        }
        if(remaingQty > 0){
            array?.push({...takerOrder, qty: remaingQty});
            if(type === "buy")
                array?.sort((a,b)=> a.price - b.price);
            else
                array?.sort((a,b)=> b.price - a.price);
        }
        return result;
        
    }

    getOrderBook( market: string )
    {
        if(this.orderBook.get(market) === undefined)
            return undefined;
        else
            return this.orderBook.get(market);
    }

    cancelOrder(market: string , id: string, type: "buy"| "sell")
    {
        let orderList = type === "buy" ? this.orderBook.get(market)!.asks : this.orderBook.get(market)!.bids;
        let index = orderList.findIndex( order => order.id === id);
        orderList.splice(index,1);
        return true;
    }
    seedOrder( seed: individualOrder, type: "buy"|"sell", market : string)
    {
        this.matchEngineCall(seed, type, market);    
    }
    
    
}

import type{ Order, individualOrder } from "./type"

export class Engine{
    private orderBook: Order ;
    constructor()
    {
        this.orderBook = new Map();
    }

    matchEngineCall(takerOrder : individualOrder, type : "buy"|"sell", market : string){
       
        let remaingQty = takerOrder.qty;
        
        const result: individualOrder[] = [];
        let array: undefined | individualOrder[];
        if(this.orderBook.get(market) === undefined)
        {
            
            this.orderBook.set(market,{bids: [], asks: []});
            
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

            if(type === "buy")
            {
                this.orderBook.get(market)!.bids.push({...takerOrder, qty: remaingQty});
                array?.sort((a,b)=> a.price - b.price);
            }
            else
            {
                this.orderBook.get(market)!.asks.push({...takerOrder, qty: remaingQty});
                array?.sort((a,b)=> b.price - a.price);
            }
        }
        console.log(result);
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
export type individualOrder = {
    id: string,
    price :number,
    qty : number
}

export type Order = Map<string, {
    asks : individualOrder[],
    bids : individualOrder[]
}>
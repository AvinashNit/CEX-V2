import z from "zod";

export const orderSchema = z.object({
    market:z.string(),
    price: z.coerce.number().positive(),
    qty: z.coerce.number().positive(),
    type:z.enum(["buy" , "sell"])
})

export type userBalance = {
    available: number,
    locked : number
}



export type balanceSchema = Map<string, Map<string, userBalance >>;
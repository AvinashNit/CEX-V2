import * as z from "zod";

export const signUpSchema = z.object({
    email: z.email("Invalid email address").trim(),
    password: z.string().min(8, "Password must be at least 8 characters long "),

})




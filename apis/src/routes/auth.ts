import { Router } from "express";
import { loginHandler, signUpHandler } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/signup", signUpHandler);
authRouter.post("/login", loginHandler);

export default authRouter;
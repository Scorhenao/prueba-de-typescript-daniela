import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
export const authRouter: Router = Router();

authRouter.post("/register", AuthController.registerUser);
authRouter.post("/login", AuthController.loginUser);

export default authRouter;
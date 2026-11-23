import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/generate-token", authController.generateToken);
router.post("/login", authController.login);


export const authRoute = router;
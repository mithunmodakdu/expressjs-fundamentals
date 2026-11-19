import type { Request, Response } from "express";
import { authService } from "./auth.service";

const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: "You have logged in successfully.",
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    })
  }
};

export const authController = {
  login
}
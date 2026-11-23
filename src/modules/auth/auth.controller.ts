import type { Request, Response } from "express";
import { authService } from "./auth.service";

const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);

    const {refreshToken} = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false, // http-> false, https-> true, In production-> true
      httpOnly: true, // prevent XSS(Cross-Site Scripting) attack
      sameSite: "lax", // "none", "strict", "lax"  prevent CSRF(Cross-site Request Forgery) attack
      // maxAge: 
      path: "/",
      domain: "localhost"  //In production-> example.com
    })

    res.status(200).json({
      success: true,
      message: "You have logged in successfully.",
      data: result
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
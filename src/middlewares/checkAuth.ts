import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

const checkAuth = (...roles: string[]) => {
  
  return async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    const decodedAccessToken = jwt.verify(
      accessToken as string,
      config.jwt_secret as string,
    ) as JwtPayload;
    

    const user = await pool.query(
      `
    SELECT * FROM users WHERE email = $1
    `,
      [decodedAccessToken.email],
    );

    if (user.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (!user.rows[0].is_active) {
      res.status(403).json({
        success: false,
        message: "Access Forbidden.",
      });
    }

    req.user = decodedAccessToken;

    next();
  };
};

export default checkAuth;

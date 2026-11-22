import type { NextFunction, Request, Response } from "express";

const checkAuth = (req: Request, res: Response, next: NextFunction) =>{
  const accessToken = req.headers.authorization;

  if(!accessToken){
    res.status(401).json({
      success: false,
      message: "Unauthorized Access"
    })
  }

  next();
}

export default checkAuth;
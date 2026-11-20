import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IAuth } from "./auth.interface";

const login = async (payload: IAuth) => {
  const { email, password } = payload;
  
  const user = await pool.query(
    `
  SELECT * FROM users WHERE email = $1
    `,
    [email],
  );

  if(user.rowCount === 0){
    throw new Error("Invalid Credentials.")
  }

  const isPasswordMatched = await bcrypt.compare(password, user.rows[0].password);
  
  if(!isPasswordMatched){
    throw new Error("Your password is incorrect.")
  }

  if(!user.rows[0].is_active){
    throw new Error("Your account is inactive. Please contact with our support team.")
  }

  
};

export const authService = {
  login,
};

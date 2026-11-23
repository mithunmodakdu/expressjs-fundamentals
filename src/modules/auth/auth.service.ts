import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IAuth } from "./auth.interface";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";

const login = async (payload: IAuth) => {
  const { email, password } = payload;

  const user = await pool.query(
    `
  SELECT * FROM users WHERE email = $1
    `,
    [email],
  );

  if (user.rowCount === 0) {
    throw new Error("Invalid Credentials.");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    user.rows[0].password,
  );

  if (!isPasswordMatched) {
    throw new Error("Your password is incorrect.");
  }

  if (!user.rows[0].is_active) {
    throw new Error(
      "Your account is inactive. Please contact with our support team.",
    );
  }

  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret, {
    expiresIn: "10d",
  });

  return { accessToken, refreshToken, user: user.rows[0] };
};

const generateToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("Unauthorized Access");
  }

  const decodedRefreshToken = jwt.verify(
    refreshToken as string,
    config.jwt_refresh_secret,
  ) as JwtPayload;

  const user = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [decodedRefreshToken.email],
  );

  if (user.rowCount === 0) {
    throw new Error("User Not Found");
  }

  if (!user.rows[0].is_active) {
    throw new Error("Access Forbidden.");
  }

   const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: "1h",
  });

  return {accessToken};
};

export const authService = {
  login,
  generateToken
};

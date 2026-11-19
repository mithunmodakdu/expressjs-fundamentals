import type { IAuth } from "./auth.interface";

const login = async(payload: IAuth) =>{
  const {email, password} = payload;
  console.log(email, password)
}

export const authService = {
  login
}
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env")
});

const config = {
  port: process.env.PORT,
  connection_string: process.env.DATABASE_URL as string,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET as string,

}

export default config;
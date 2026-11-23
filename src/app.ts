import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import "dotenv/config";
import { userRoute } from "./modules/user/user.route";
import logger from "./middlewares/logger";
import { profileRoute } from "./modules/profile/profile.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoute } from "./modules/auth/auth.route";

const app: Application = express();

const corsOptions = {
  origin: ["http//localhost:3000"],
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use("/api/v1/users", userRoute);
app.use("/api/v1/profiles", profileRoute);
app.use("/api/v1/auths", authRoute)

app.get("/", (req: Request, res: Response) => {
  // res.send("This is the root route of server with ExpressJs");
  res.status(200).json({
    success: true,
    message: "This is the root route of server with ExpressJs",
    author: "Mithun Kumer Modak",
  });
  // console.log(req)
});

app.use(globalErrorHandler)

export default app;



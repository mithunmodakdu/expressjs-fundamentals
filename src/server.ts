import express, { type Application, type Request, type Response } from "express";
import "dotenv/config";
import {Pool} from "pg";

const app: Application = express();
const port = process.env.PORT;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
console.log(pool)

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}))


app.get("/", (req: Request, res: Response) => {
  // res.send("This is the root route of server with ExpressJs");
  res.status(200).json({
    success: true,
    message: "This is the root route of server with ExpressJs",
    author: "Mithun Kumer Modak"
  })
  // console.log(req)
})

app.post("/", async(req: Request, res: Response) => {
  const {name, age, password} = req.body;

   res.status(201).json({
    success: true,
    message: "User created",
    data: {name, age}
  })
  console.log(password)
})

app.listen(port, () => {
  console.log(`Server with ExpressJs is running on the port ${port}`)
})
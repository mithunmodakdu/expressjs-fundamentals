import express, { type Application, type Request, type Response } from "express";
import "dotenv/config";

const app: Application = express();
const port = process.env.PORT;

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
  console.log(req.body)
   res.status(201).json({
    success: true,
    message: "User created"
  })
})

app.listen(port, () => {
  console.log(`Server with ExpressJs is running on the port ${port}`)
})
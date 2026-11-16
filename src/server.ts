import express, { type Application, type Request, type Response } from "express";
import "dotenv/config";
import {Pool} from "pg";

const app: Application = express();
const port = process.env.PORT;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
// console.log(pool)

const initDB = async() => {
  try {
    await pool.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        age INT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );  
    `)

    console.log("Database connected successfully.")
  } catch (error) {
    console.log(error)
  }
}

initDB();

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
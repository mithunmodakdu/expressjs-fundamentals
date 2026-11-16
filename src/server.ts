import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import "dotenv/config";
import { Pool } from "pg";
import config from "./config";



const app: Application = express();
const port = config.port;

const pool = new Pool({
  connectionString: config.connection_string
});
// console.log(pool)

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        age INT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );  
    `);

    console.log("Database connected successfully.");
  } catch (error) {
    console.log(error);
  }
};

initDB();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  // res.send("This is the root route of server with ExpressJs");
  res.status(200).json({
    success: true,
    message: "This is the root route of server with ExpressJs",
    author: "Mithun Kumer Modak",
  });
  // console.log(req)
});

app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // console.log(req.params)

    const result = await pool.query(
      `
      SELECT * FROM users WHERE id = $1  
    `,
      [id],
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved by id",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

app.get("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users
      `);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "All users retrieved successfully.",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

app.post("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password, age } = req.body;
    const result = await pool.query(
      `
      INSERT INTO users(name, email, password, age)
        VALUES($1, $2, $3, $4) RETURNING *
    `,
      [name, email, password, age],
    );
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error,
    });
  }
});

app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, age, is_active } = req.body;

    const result = await pool.query(
      `
      UPDATE users
      SET
        name = COALESCE($1, name),
        password = COALESCE($2, password),
        age = COALESCE($3, age),
        is_active = COALESCE($4, is_active),
        updated_at = NOW()
      WHERE  id = $5 RETURNING *

    `,
      [name ?? null, password ?? null, age ?? null, is_active ?? null, id],
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM  users
      WHERE id = $1
      `,
      [id],
    );

    // console.log(result)
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

app.listen(port, () => {
  console.log(`Server with ExpressJs is running on the port ${port}`);
});

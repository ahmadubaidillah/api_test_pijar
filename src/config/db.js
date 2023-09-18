//connect to database
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const db = new pg.Pool({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database,
  port: process.env.db_port,
});

// Check connection

db.connect((err) => {
  if (err) {
    console.log(err);
  }
});
export default db;

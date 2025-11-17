import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gabrieldev123",
  database: "backend_integrador",
});

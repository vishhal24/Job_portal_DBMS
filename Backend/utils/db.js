import mysql from "mysql2/promise";
import dotenv from 'dotenv';
dotenv.config();
async function main() {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '',
      user: process.env.DB_USER || '',
      password: process.env.DB_PASS || '',
      database : process.env.DB_NAME || ''
    });
    console.log("MYSQL Connected ");
    return connection;
}


export default main;
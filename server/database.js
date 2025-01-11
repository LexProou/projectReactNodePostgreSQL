import pg from 'pg'
const { Client } = pg
import * as dotenv from 'dotenv';

const ENV_FILE = `.env`;

dotenv.config({ path: ENV_FILE });

export const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

client.connect();


client.query(`SeLECT * FROM cards`, (err, res) => {
    if (err) {
        console.log(err.stack)
    } else {
        console.log(res.rows)
    }
})






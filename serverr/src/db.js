import pg from 'pg'
import 'dotenv/config'
const { Pool } = pg

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'tree_talk',
    password: process.env.DB_PASS,
    max: 20,
})

export default pool;
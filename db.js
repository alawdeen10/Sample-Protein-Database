import mysql from 'mysql2';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alanm352',
    database: 'protein',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:');
    } else {
        console.log('Connected to MySQL database');
    }
});

export default db;

import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { results: [] });
});

app.post('/search', (req, res) => {
    const query = req.body.query;

    const sql = `SELECT * FROM info WHERE Protein_Name LIKE '%${query}%'`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('index', { results });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
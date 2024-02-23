import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "booksnote",
    password: "rootroot",
    port: 5432
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    try {
        res.render("index.ejs");
    } catch (error) {
        console.log(error)
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
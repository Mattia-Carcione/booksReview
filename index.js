// <-- Import dependecies
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
// END dependencies --> 

// <-- Setup backend
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
// END setup-->

let sortBy = "id";
let order = "DESC";

// <-- Routes
app.get("/", async (req, res) => {
    let books = [];
    try {
        const data = db.query(`SELECT * FROM books ORDER BY ${sortBy} ${order}`);
        (await data).rows.forEach((book) => {
            books.push(book);
        });
        res.render("index.ejs", {
            books: books
        });
    } catch (error) {
        console.log(error);
    }
});

app.post("/sort", (req, res) => {
    sortBy = req.body.sort;
    if (sortBy === "title" || sortBy === "author") {
        order = "ASC";
    }
    res.redirect("/");
})
// END routes -->

// Setup server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
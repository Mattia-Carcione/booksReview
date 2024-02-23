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
        const data = await db.query(`SELECT * FROM books ORDER BY ${sortBy} ${order}`);
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
});

app.get("/create", (req, res) => {
    res.render("index.ejs");
});

app.post("/store", async (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const review = req.body.review;
    const rating = req.body.rating;
    const isbn = req.body.isbn;
    try {
        await db.query("INSERT INTO books (title, author, review, rating, isbn) VALUES ($1, $2, $3, $4, $5)", [title, author, review, rating, isbn]);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});

app.put("/edit", async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const author = req.body.author;
    const review = req.body.review;
    const rating = req.body.rating;
    const isbn = req.body.isbn;
    try {
        await db.query("UPDATE books SET title = $1, author = $2, review = $3, rating = $4, isbn = $5 WHERE id = $6", [title, author, review, rating, isbn, id]);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});
// END routes -->

// Setup server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
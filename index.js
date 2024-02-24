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
        (data).rows.forEach((book) => {
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
    res.render("index.ejs", {
        action: "store"
    });
});

app.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const data = await db.query(`SELECT * FROM books WHERE id = $1`, [id]);
    const book = data.rows[0];
    res.render("index.ejs", {
        book: book,
        action: `update/${id}`
    });
})

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

app.post("/update/:id", async (req, res) => {
    const id = req.params.id;
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

app.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await db.query("DELETE FROM books WHERE id = $1", [id]);
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
// END routes -->

// Setup server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
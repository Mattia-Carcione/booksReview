# BooksNote Project

## How to run the project

### Install dependencies
```
npm i
```

### Setup the PostgreSQL db into index.js
```
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "", <!-- put the name of your database here -->
    password: "", <!-- write your password here -->
    port: 5432
});
```

### Create table into your db with this column
```
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(size) NOT NULL,
    author VARCHAR(size) NOT NULL,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    rating INTEGER
);
```

### Run the server
```
node index.js
```

### Copy the link into the browser
````
http://localhost:3000
```


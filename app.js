import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let id = 1;

let books = [{
    id: id++,
    title: "title",
    author: "Author",
    status: true
}];

app.post("/books", (req, res) => {
    try {
        const { author, title, status } = req.body;
        if (typeof author === "string" && typeof title === "string" && typeof status === "boolean") {
            books.push({ author, title, status, id: id++ });
            res.status(201).json({ Notification: "Success", books });
        } else {
            throw new Error("Invalid input types");
        }
    } catch (err) {
        res.status(406).json({ Notification: "Type error" });
    }
});

app.get("/books", (req, res) => {
    res.json({ books });
});

app.get("/books/:id", (req, res) => {
    const bookId = +req.params.id;
    const book = books.find(book => book.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send({ message: "Not found" });
    }
});

app.put("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex > -1) {
        const { author, title, status } = req.body;
        const isAuthorValid = typeof author === "string";
        const isTitleValid = typeof title === "string";
        const isStatusValid = typeof status === "boolean";

        if (isAuthorValid && isTitleValid && isStatusValid) {
            books[bookIndex] = { ...books[bookIndex], author, title, status };
            res.status(200).json({ Notification: "Book updated successfully", book: books[bookIndex] });
        } else {
            res.status(400).json({ Notification: "Invalid input types" });
        }
    } else {
        res.status(404).json({ Notification: "Book not found" });
    }
});

app.delete("/books/:id", (req, res) => {
    const bookId = +req.params.id;
    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex > -1) {
        books.splice(bookIndex, 1);
        res.status(200).send({ Message: "Deleted Successfully" });
    } else {
        res.status(404).send({ Message: "Not found" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const bookService = require("../service/BookService");

const bookURL = "/books";

//Get all books
router.get(bookURL, async (req, res) => {
  try {
    const allBooks = await bookService.getAllBooks();
    console.log("Get all books ", allBooks);
    res.json(allBooks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching books" });
  }
});

// Create book
router.post(bookURL, async (req, res) => {
  console.log("Book request.....", req.body);
  try {
    await bookService.addBook(req.body);
    return res.status(201).send("Saved Book Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//delete  book
router.delete(bookURL + "/:id", async (req, res) => {
  try {
    const delBook = await bookService.deleteBook(req.params.id);
    if (!delBook) {
      return res.status(404).send("Book not found for delete");
    }
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

//update
router.patch(bookURL + "/:id", async (req, res) => {
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);
    if (!updatedBook) {
      return res.status(404).send("Book not found");
    }
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

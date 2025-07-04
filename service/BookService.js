//CRUD for Book data handling
const Book = require('../model/BookModel')
const {v4: uuidv4} = require('uuid')

async function getAllBooks(){
   return Book.find();
}

async function addBook(book){
   const bookData = new Book({
      bookId: uuidv4(),
      bookName: book.bookName,
      author: book.author,
      edition: book.edition,
      publisher: book.publisher,
      isbn: book.isbn,
      price: parseInt(book.price),
      totalQty: parseInt(book.totalQty),
      availableQty: parseInt(book.availableQty),
    });
    return bookData.save(bookData);
}

async function deleteBook(bookId){
     return Book.findOneAndDelete(bookId)
}

async function updateBook(bookId, bookData){
    return Book.findOneAndUpdate({ bookId:bookId},bookData,{new : true})
}

module.exports = { getAllBooks, addBook, deleteBook,updateBook }
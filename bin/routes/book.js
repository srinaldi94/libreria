const express = require('express');
const Book = require('../models/Book');

const app = express();

app.post('/book/create', (req, res) => {
    let {title, pages, year, isbn, author} = req.body;
    let book = new Book(title, pages, year, isbn, author);

    let created = book.create(book);

    res.json({status: true, message: created});
});

app.get('/book/list', (req, res) => {
    let book = new Book();

    let listBooks = book.find();

    res.json({status: true, listBooks});
});

app.get('/book/:isbn', (req, res) => {
    let isbn = req.params.isbn;
    let book = new Book();

    let bookByIsbn = book.findByIsbn(isbn);

    res.json({status: true, book: bookByIsbn});
});

app.delete('/book/delete/:isbn', (req, res) => {
    let isbn = req.params.isbn;
    let book = new Book();

    let message = book.delete(isbn);

    res.json({status: true, message: message});
});

app.put('/book/update/:isbn', (req, res) => {
    let {title, pages, year, author} = req.body;
    let isbn = req.params.isbn;
    let book = new Book(title, pages, year, isbn, author);

    let message = book.update(isbn,book);

    res.json({status: true, message: message});
});

module.exports = app;
const express = require('express')
const { nanoid } = require('nanoid')

const db = require('../db.js')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('books/books', {
        books: db.get('books').value()
    });
})                                                                 

router.get('/search', (req, res) => {
    let books = db.get('books').value();
    let q = req.query.q
    let matchedBooks = books.filter((book) => {
        return book.title
            .toLowerCase()
            .indexOf(q.toLowerCase()) !== -1
    })
    res.render('books/books', {
        books: matchedBooks,
        q: q
    })
})
router.get('/create', (req, res) => {
    res.render('books/createBook');
});

router.get('/:id', (req, res) => {
    let books = db.get('books').value();
    let id = req.params.id;
    db.read()
    let book = books.find((book) => {
        return book.id === id
    })
    res.render('./books/view', {
        book: book
    }) 
})

router.post('/create', (req, res) => {
    req.body.id = nanoid()
    db.get('books')
        .push(req.body)
        .write()    
    res.redirect('/books');
});

module.exports = router
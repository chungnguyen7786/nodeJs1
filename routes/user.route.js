const express = require('express')
const { nanoid } = require('nanoid')

const db = require('../db.js')

const router = express.Router()

// const users = db.get('users').value();

router.get('/', (req, res) => {
    res.render('users/users', {
        users: db.get('users').value()
    });
})                                                                

router.get('/search', (req, res) => {
    let users = db.get('users').value();
    let q = req.query.q
    let matchedUsers = users.filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/users', {
        users: matchedUsers,
        q: q
    })
})

router.get('/create', (req, res) => {
    res.render('users/createUser');
});

router.get('/:id', (req, res) => {
    let users = db.get('users').value();
    let id = req.params.id;
    db.read()
    let user = users.find((user) => {
        return user.id === id
    })
    res.render('./users/view', {
        user: user
    }) 
})

router.post('/create', (req, res) => {
    req.body.id = nanoid()
    db.get('users')
        .push(req.body)
        .write()    
    res.redirect('/users');
});

module.exports = router
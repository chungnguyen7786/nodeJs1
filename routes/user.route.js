const express = require('express')

const db = require('../db.js')

var Controller = require('../controllers/user.controller')

const router = express.Router()

router.get('/', Controller.index) 

router.get('/cookie', (req, res, next) => {
  res.cookie('user-id', 12345)
  res.send('hello')
})

router.get('/search', Controller.search)

router.get('/create', Controller.create)

router.get('/:id', Controller.get)

router.post('/create', Controller.postCreate)

module.exports = router
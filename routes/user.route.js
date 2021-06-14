const express = require('express')

const db = require('../db.js')

var Controller = require('../controllers/user.controller')

const router = express.Router()

router.get('/', Controller.index)                                                                

router.get('/search', Controller.search)

router.get('/create', Controller.create)

router.get('/:id', Controller.get)

router.post('/create', Controller.postCreate)

module.exports = router
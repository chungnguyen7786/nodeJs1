const express = require('express')

const controller = require('../controllers/user.controller')
const validate = require('../validate/user.validate')

const router = express.Router()

router.get('/', controller.index) 

// router.get('/cookie', (req, res, next) => {
//   res.cookie('user-id', 12345)
//   res.send('hello')
// })

router.get('/search', controller.search)

router.get('/create', controller.create)
router.post('/create', validate.postCreate, controller.postCreate)

router.get('/view/:id', controller.view)

router.get('/delete/:id', controller.delete)

router.get('/update/:id', controller.update)
router.post('/update/:id', controller.postUpdate)

module.exports = router
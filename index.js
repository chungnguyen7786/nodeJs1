const express = require('express')
var cookieParser = require('cookie-parser')

const userRoute = require ('./routes/user.route.js')
const bookRoute = require ('./routes/book.route.js')
const authRoute = require ('./routes/auth.route.js')

const authMiddleware = require('./middlewares/auth.middleware')

const port = 4000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())

app.set('view engine', 'pug')
app.set('views', './views')


app.get('/', (req, res) => { 
  res.render('index', {
    name: 'Chung Nguyen'
  });
})

app.use('/users', authMiddleware.requireAuth, userRoute)
app.use('/books', authMiddleware.requireAuth, bookRoute)
app.use('/auth', authRoute)

app.listen(port, () => {
  console.log('server listening on port'+ port)
})
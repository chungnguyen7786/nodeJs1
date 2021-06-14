const express = require('express')
var cookieParser = require('cookie-parser')

const userRoute = require ('./routes/user.route.js')
const bookRoute = require ('./routes/book.route.js')

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

app.use('/users', userRoute)
app.use('/books', bookRoute)

app.listen(port, () => {
  console.log('server listening on port'+ port)
})
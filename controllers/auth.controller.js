const db = require('../db.js')
const md5 = require('md5')

module.exports.login = (req, res) => {
  res.render('auth/login', {
    users: db.get('users').value()
  })
}     

module.exports.postLogin = (req, res) => {
  let email = req.body.email
  let hashedPassword = md5(req.body.password)
  let user = db.get('users').find({email: email}).value()

  if(!user) {
    res.render('./auth/login', {
      errors: [
        'User does not exist.'
      ], 
      value: req.body      
    })
    return    
  }

  if(user.password !== hashedPassword) {
    res.render('./auth/login', {
      errors: [
        'Wrong password.'
      ],
      value: req.body
    })
    return    
  }
  res.cookie('userId', user.id)
  res.redirect('/users')
}       
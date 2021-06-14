const { nanoid } = require('nanoid')

const db = require('../db.js')

module.exports.index = (req, res) => {
  res.render('users/users', {
    users: db.get('users').value()
  });
}                                                                

module.exports.search = (req, res) => {
  let users = db.get('users').value();
  let q = req.query.q
  let matchedUsers = users.filter((user) => {
    return user.name
      .toLowerCase()
      .indexOf(q.toLowerCase()) !== -1
  })
  res.render('users/users', {
    users: matchedUsers,
    q: q
  })
}

module.exports.create = (req, res) => {
  console.log(req.cookies)
  res.render('users/createUser');
}

module.exports.get = (req, res) => {
  let users = db.get('users').value();
  let id = req.params.id;
  db.read()
  let user = users.find((user) => {
    return user.id === id
  })
  res.render('./users/view', {
    user: user
  }) 
}

module.exports.postCreate = (req, res) => {
  req.body.id = nanoid()
  let errors = []
  if (!req.body.name) {
    errors.push('Name is required.')
  }
  if (!req.body.email) {
    errors.push('Email is required.')
  }
  if (!req.body.phone) {
    errors.push('Phone is required.')
  }
  if(errors.length) {
    res.render('users/createUser', {
      errors: errors,
      value: req.body 
    })
    return
  }
  db.get('users')
    .push(req.body)
    .write()    
  res.redirect('/users');
}


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
  res.render('users/createUser');
}

module.exports.postCreate = (req, res) => {
  req.body.id = nanoid()
  req.body.avatarUrl = 'https://picsum.photos/50'
  
  db.get('users')
    .push(req.body)
    .write()    
  res.redirect('/users')  
}

module.exports.view = (req, res) => {
  let users = db.get('users').value();
  let id = req.params.id;
  let user = users.find((user) => {
    return user.id === id
  })
  res.render('./users/view', {
    user: user
  }) 
}

module.exports.delete = (req, res) => {
  let id = req.params.id
  db.get('users').remove({id: id}).write()
  let users = db.get('users').value()
  res.render('./users/users', {
    users: users
  }) 
}

module.exports.update = (req, res) => {
  let id = req.params.id
  let user = db.get('users').find({id: id}).value()
  res.render('users/updateUser', {
    user: user
  });
}

module.exports.postUpdate = (req, res) => {
  let id = req.params.id
  if (req.body.name) {
    db.get('users')
    .find({id:id})
    .assign({name: req.body.name})
    .write()
  }
  if (req.body.email) {
    db.get('users')
    .find({id:id})
    .assign({email: req.body.email})
    .write()
  }
  if (req.body.phone) {
    db.get('users')
    .find({id:id})
    .assign({phone: req.body.phone})
    .write()
  }

  res.redirect('/users')  
}


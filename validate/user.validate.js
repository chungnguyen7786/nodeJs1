module.exports.postCreate = (req, res, next) => {
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

  next();
}
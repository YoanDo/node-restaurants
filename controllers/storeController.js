exports.myMiddleware = (req, res, next) => {
  req.name = 'Yo';
  // res.cookie('name', 'Yo is cool', { maxAge: 9000000 })
  if (req.name === 'Yo') {
    throw Error('That is a stupid name');
  }
  next();
}

exports.homePage = (req, res) => {
  console.log(req.name)
  res.render('index')
}

